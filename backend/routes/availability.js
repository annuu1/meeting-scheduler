const express = require('express');
const router = express.Router();
const Availability = require('../models/Availability');
const auth = require('../middleware/auth');

// Get Availability
router.get('/', auth, async (req, res) => {
  try {
    let availability = await Availability.findOne({ user: req.user.id });
    console.log(availability)
    if(!availability){
      availability = new Availability({
        // user : req.user.id,
        // days: {
        //   Sun: { checked: false, times: [] },
        //   Mon: { checked: true, times: [{ start: '09:00', end: '17:00' }] },
        //   Tue: { checked: true, times: [{ start: '09:00', end: '17:00' }] },
        //   Wed: { checked: true, times: [{ start: '09:00', end: '17:00' }] },
        //   Thu: { checked: true, times: [{ start: '09:00', end: '17:00' }] },
        //   Fri: { checked: true, times: [{ start: '09:00', end: '17:00' }] },
        //   Sat: { checked: true, times: [{ start: '09:00', end: '17:00' }] },
        // },
        // timeZone: 'India Standard Time',
      })
      await availability.save();
    }
    res.json({ success: true, availability });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

//put to update the availability
router.put('/', auth, async(req, res) => {
  try{
    const { days, timeZone } = req.body;
    
    //vallidatios apply
    if (!days || typeof days !== 'object') {
      return res.status(400).json({ success: false, message: 'Invalid days data' });
    }
    
    let availability = await Availability.findOne({ user: req.user.id });

    if (!availability) {
      availability = new Availability({
        user: req.user.id,
        days,
        timeZone: timeZone || 'India Standard Time',
      });
    } else {
      availability.days = days;
      if (timeZone) availability.timeZone = timeZone;
    }
    await availability.save();
    res.json({ success: true, availability });
  }
  catch(error){
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
})

module.exports = router;