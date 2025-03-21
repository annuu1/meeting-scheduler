const express = require('express');
const router = express.Router();
const Availability = require('../models/Availability');
const auth = require('../middleware/auth');

// Set Availability
router.post('/', auth, async (req, res) => {
  const { dayOfWeek, startTime, endTime, isAvailable } = req.body;
  try {
    const availability = new Availability({
      userId: req.user.id,
      dayOfWeek,
      startTime,
      endTime,
      isAvailable,
    });
    await availability.save();
    res.status(201).json(availability);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Availability
router.get('/', auth, async (req, res) => {
  try {
    const availability = await Availability.find({ userId: req.user.id });
    res.json(availability);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;