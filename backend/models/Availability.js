const mongoose = require('mongoose');

const timeSlotSchema = new mongoose.Schema({
  start: {
    type: String, 
    required: true,
  },
  end: {
    type: String, 
    required: true,
  },
});

const daySchema = new mongoose.Schema({
  checked: {
    type: Boolean,
    default: false,
  },
  times: [timeSlotSchema], 
});

const availabilitySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  days: {
    Sun: { type: daySchema, default: { checked: false, times: [] } },
    Mon: { type: daySchema, default: { checked: true, times: [{ start: '09:00', end: '17:00' }] } },
    Tue: { type: daySchema, default: { checked: true, times: [{ start: '09:00', end: '17:00' }] } },
    Wed: { type: daySchema, default: { checked: true, times: [{ start: '09:00', end: '17:00' }] } },
    Thu: { type: daySchema, default: { checked: true, times: [{ start: '09:00', end: '17:00' }] } },
    Fri: { type: daySchema, default: { checked: true, times: [{ start: '09:00', end: '17:00' }] } },
    Sat: { type: daySchema, default: { checked: true, times: [{ start: '09:00', end: '17:00' }] } },
  },
  timeZone: {
    type: String,
    default: 'India Standard Time',
  },
}, { timestamps: true });

module.exports = mongoose.model('Availability', availabilitySchema);