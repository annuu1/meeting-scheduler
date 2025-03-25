const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const Availability = require('../models/Availability');
const auth = require('../middleware/auth');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Create Event
router.post('/', auth, async (req, res) => {
  const { title, description, dateTime, duration, link, bannerImage, backgroundColor, password, emails } = req.body;
  try {
    // Conflict check with existing events
    const start = new Date(dateTime);
    const end = new Date(start.getTime() + duration * 60000);
    
    const conflicts = await Event.find({
      createdBy: req.user.id,
      $or: [
        {
          dateTime: { $lt: end },
          $expr: { $gt: [{ $add: ['$dateTime', { $multiply: ['$duration', 60000] }] }, start] }
        },
        {
          dateTime: { $gte: start },
          dateTime: { $lt: end }
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

    //find the particapants and add them to the event
    const participantEmails = emails.split(',').map(email => email.trim());
    const participants = await User.find({ email: { $in: participantEmails } });

    //check if all emails are valid
    if (participants.length !== participantEmails.length) {
      const foundEmails = participants.map((user) => user.email);
      const missingEmails = participantEmails.filter((email) => !foundEmails.includes(email));
      return res.status(400).json({
        success: false,
        error: `These emails are not registered users: ${missingEmails.join(', ')}`,
      });
    }

    // get participants' list
    const particapantList = participants.map((user) => ({
      name: user.firstName + ' ' + user.lastName,
      user: user._id,
      status: 'pending',
    }));

    // particapantList.push({ name: req.user.firstName + ' ' + req.user.lastName, user: req.user.id, accepted: true });

    const event = new Event({
      title,
      description,
      dateTime,
      duration,
      link,
      bannerImage,
      backgroundColor,
      password: password ? await bcrypt.hash(password, 10) : undefined,
      participants: particapantList,
      createdBy: req.user.id,
    });
    await event.save();
    res.status(201).json( { success: true, message: 'Event created successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

//get events status wise
router.get('/userMeetings',auth, async (req, res) => {
  try {
    const now = new Date();
    const query = {
      $or: [
        { createdBy: req.user.id },
        { 'participants.user': req.user.id },
      ],
    };
    const meetings = await Event.find(query)
    .populate('createdBy', 'name email')
      // .populate('participants.user', 'name email')
      // meetings.map((m) => {
      //   const meets = m.participants.find((p)=>{
      //     return p.status === "pending1"
      //   })
      //   console.log("meeting:", meets)
      // })
    const categorizedMeetings = {
      upcoming: meetings.filter(m => m.dateTime > now && (
        m.createdBy.id.toString() === req.user.id || 
        m.participants.find(p => p.status === 'accepted')
      )),
      past: meetings.filter(m => m.dateTime && m.dateTime + m.duration*60000 < now),
      pending: meetings.filter(m => 
        m.participants.find(p => p.status === 'pending')
      ),
      cancelled: meetings.filter(m => 
        m.participants.find(p => p.status === 'rejected')
      ),
    };
    // console.log(categorizedMeetings)

    res.json( {success: true , events :categorizedMeetings});
  } catch (error) {
    res.status(500).json({success: false, message: 'Server error' });
  }
});

// Get Events (with pagination)
router.get('/', auth, async (req, res) => {
  const { page = 1, limit = 10, status } = req.query;
  try {
    const query = {
      $or: [
        { createdBy: req.user.id },
        { 'participants.user': req.user.id },
      ],
    };
    if (status) query.status = status;
    const events = await Event.find(query)
    .populate('createdBy', 'name email')
      .populate('participants.user', 'name email')
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
// update user status
router.put('/status/:id', auth, async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const event = await Event.findById(id);
    if (!event) return res.status(404).json({ message: 'Meeting not found' });

    const participant = event.participants.find(p => p.user._id.toString() === req.user.id);
    // console.log(event.participants[0].user._id.toString() === req.user.id)
    if (!participant) return res.status(403).json({ success: false, message: 'Not a participant' });

    participant.status = status;
    await event.save();

    res.json({success: true, message: 'Status updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
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