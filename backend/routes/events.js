const express = require("express");
const router = express.Router();
const Event = require("../models/Event");
const Availability = require("../models/Availability");
const auth = require("../middleware/auth");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const mongoose = require("mongoose");

// Create Event
router.post("/", auth, async (req, res) => {
  const {
    title,
    description,
    dateTime,
    duration,
    link,
    bannerImage,
    backgroundColor,
    password,
    emails,
  } = req.body;

  try {
    // Convert event times to Date objects
    const eventStart = new Date(dateTime); 
    const eventEnd = new Date(eventStart.getTime() + duration * 60000);

    const dayOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][eventStart.getDay()];
    const eventStartTime = eventStart.toTimeString().slice(0, 5); // e.g., "09:30"
    const eventEndTime = eventEnd.toTimeString().slice(0, 5); // e.g., "10:00"

    const availability = await Availability.findOne({ user: req.user.id });
    if (!availability) {
      return res
        .status(404)
        .json({ success: false, error: "No availability set for this user" });
    }

    const dayAvailability = availability.days[dayOfWeek];
    if (!dayAvailability.checked) {
      return res
        .status(409)
        .json({ success: false, error: `Not available on ${dayOfWeek}` });
    }

    const isAvailable = dayAvailability.times.some((slot) => {
      const slotStart = slot.start;
      const slotEnd = slot.end;
      
      return slotStart <= eventStartTime && slotEnd >= eventEndTime;
    });

    if (!isAvailable) {
      return res
        .status(409)
        .json({ success: false, error: "Event time is outside available time slots" });
    }

    const participantEmails = emails ? emails.split(",").map((email) => email.trim()) : [];
    const participants = await User.find({ email: { $in: participantEmails } });

    if (participantEmails.length > 0 && participants.length !== participantEmails.length) {
      const foundEmails = participants.map((user) => user.email);
      const missingEmails = participantEmails.filter(
        (email) => !foundEmails.includes(email)
      );
      return res.status(400).json({
        success: false,
        error: `These emails are not registered users: ${missingEmails.join(", ")}`,
      });
    }

    // Create participant list
    const participantList = participants.map((user) => ({
      name: `${user.firstName} ${user.lastName}`,
      user: user._id,
      status: "pending",
    }));

    // Optionally add the creator as an accepted participant (uncomment if needed)
    // participantList.push({
    //   name: `${req.user.firstName} ${req.user.lastName}`,
    //   user: req.user.id,
    //   status: "accepted",
    // });

    // Step 4: Create and save the event
    const event = new Event({
      title,
      description,
      dateTime: eventStart,
      duration,
      link,
      bannerImage,
      backgroundColor,
      password: password ? await bcrypt.hash(password, 10) : undefined,
      participants: participantList,
      createdBy: req.user.id,
    });

    await event.save();
    res.status(201).json({ success: true, message: "Event created successfully" });
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).json({ success: false, error: "Server error" });
  }
});

//get events status wise
router.get("/userMeetings", auth, async (req, res) => {
  try {
    const now = new Date();
    const query = {
      $or: [{ createdBy: req.user.id }, { "participants.user": req.user.id }],
    };
    const meetings = await Event.find(query)
      .populate("createdBy", "name email")
      .populate("participants.user", "name email");

    const categorizedMeetings = {
      upcoming: meetings.filter(
        (m) =>          (
            m.createdBy.id.toString() === req.user.id ||
            m.participants.find((p) => p.status === "accepted"))
      ),
      past: meetings.filter((m) => {
        const isPast = new Date(m.dateTime).getTime() + m.duration * 60000 < now.getTime();
        const isCreator = m.createdBy._id.toString() === req.user.id;
        const participant = m.participants.find(
          (p) => p.user && p.user._id.toString() === req.user.id
        );
        return isPast && (isCreator || participant);
      }),
      pending: meetings.filter((m) =>{
        const isCreator = m.createdBy._id.toString() === req.user.id;
        const participant = m.participants.find(
          (p) => p.user && p.user._id.toString() === req.user.id
        );
        return !isCreator && participant && participant.status === "pending";
    }),
      cancelled: meetings.filter((m) =>{
        const isCreator = m.createdBy._id.toString() === req.user.id;
        const participant = m.participants.find(
          (p) => p.user && p.user._id.toString() === req.user.id
        );
        return !isCreator && participant && participant.status === "rejected";
      }
      ),
    };
    res.json({ success: true, events: categorizedMeetings });
  } catch (error) {

    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Get Events (with pagination)
router.get("/", auth, async (req, res) => {
  const { page = 1, limit = 10} = req.query;
  try {
    const query = {
      $or: [{ createdBy: req.user.id }],
    };
    const events = await Event.find(query)
      .populate("createdBy", "name email")
      .populate("participants.user", "name email")
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .sort({ dateTime: 1 });
    const total = await Event.countDocuments(query);
    res.json({
      success: true,
      events,
      total,
      page: parseInt(page),
      limit: parseInt(limit),
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Update Event
router.put("/:id", auth, async (req, res) => {
  try {
    const event = await Event.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user.id },
      { ...req.body, updatedAt: Date.now() },
      { new: true }
    );
    if (!event)
      return res.status(404).json({ success: false, error: "Event not found" });
    res.json( { success: true, message: "Event updated successfully", event });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});
// update participant status
router.put("/status/:id", auth, async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const event = await Event.findById(id);
    if (!event) return res.status(404).json({ message: "Meeting not found" });

    const participant = event.participants.find(
      (p) => p.user._id.toString() === req.user.id
    );

    if (!participant)
      return res
        .status(403)
        .json({ success: false, message: "Not a participant" });

    participant.status = status;
    await event.save();

    res.json({ success: true, message: "Status updated successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Delete Event
router.delete("/:id", auth, async (req, res) => {
  try {
    const event = await Event.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user.id,
    });
    if (!event) return res.status(404).json({ error: "Event not found" });
    res.json({ success: true, message: "Event deleted" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Join Event (Public Route)
router.post("/join/:id", async (req, res) => {
  const { password } = req.body;
  try {
    const event = await Event.findById(req.params.id);
    if (!event)
      return res.status(404).json({ success: false, error: "Event not found" });
    if (event.password && !(await bcrypt.compare(password, event.password))) {
      return res
        .status(401)
        .json({ success: false, error: "Invalid password" });
    }
    res.json({ event });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
