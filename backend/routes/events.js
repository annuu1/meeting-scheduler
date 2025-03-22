const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const Availability = require('../models/Availability');
const auth = require('../middleware/auth');
const bcrypt = require('bcryptjs');

// Create Event
router.post('/', auth, async (req, res) => {
  const { title, description, dateTime, duration, link, bannerImage, backgroundColor, password } = req.body;
  try {
    // Conflict check with existing events
    const start = new Date(dateTime);
    const end = new Date(start.getTime() + duration * 60000);
    
    const conflicts = await Event.find({
      createdBy: req.user.id,
      $or: [
        {
          dateTime: { $lt: end }, // Existing event starts before the new event ends
          $expr: { $gt: [{ $add: ['$dateTime', { $multiply: ['$duration', 60000] }] }, start] } // Existing event ends after the new event starts
        },
        {
          dateTime: { $gte: start }, // Existing event starts after the new event starts
          dateTime: { $lt: end } // Existing event ends before the new event ends
        }
      ]
    });

    if (conflicts.length > 1000) return res.status(409).json({ success: false, error: 'Time slot conflict' });

    // Check availability
    const dayOfWeek = start.getDay();
    const startTime = start.toTimeString().slice(0, 5);
    const endTime = end.toTimeString().slice(0, 5);
    const availability = await Availability.findOne({
      userId: req.user.id,
      dayOfWeek,
      startTime: { $lte: startTime },
      endTime: { $gte: endTime },
      isAvailable: true,
    });
    if (availability) return res.status(409).json({ success: false, error: 'Not available at this time' });

    const event = new Event({
      title,
      description,
      dateTime,
      duration,
      link,
      bannerImage,
      backgroundColor,
      password: password ? await bcrypt.hash(password, 10) : undefined,
      createdBy: req.user.id,
    });
    await event.save();
    res.status(201).json( { success: true, message: 'Event created successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get Events (with pagination)
router.get('/', auth, async (req, res) => {
  const { page = 1, limit = 10, status } = req.query;
  try {
    const query = { createdBy: req.user.id };
    if (status) query.status = status;
    const events = await Event.find(query)
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .sort({ dateTime: 1 });
    const total = await Event.countDocuments(query);
    res.json({ success: true, events, total, page: parseInt(page), limit: parseInt(limit) });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Update Event
router.put('/:id', auth, async (req, res) => {
  try {
    const event = await Event.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user.id },
      { ...req.body, updatedAt: Date.now() },
      { new: true }
    );
    if (!event) return res.status(404).json({ success: true, error: 'Event not found' });
    res.json(event);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Delete Event
router.delete('/:id', auth, async (req, res) => {
  try {
    const event = await Event.findOneAndDelete({ _id: req.params.id, createdBy: req.user.id });
    if (!event) return res.status(404).json({ error: 'Event not found' });
    res.json({ success: true, message: 'Event deleted' });
  } catch (error) {
    res.status(500).json( { success: false, error: error.message });
  }
});

// Join Event (Public Route)
router.post('/join/:id', async (req, res) => {
  const { password } = req.body;
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ success: false, error: 'Event not found' });
    if (event.password && !(await bcrypt.compare(password, event.password))) {
      return res.status(401).json({ success: false, error: 'Invalid password' });
    }
    res.json({ event });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;