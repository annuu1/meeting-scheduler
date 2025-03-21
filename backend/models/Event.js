const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, trim: true },
  dateTime: { type: Date, required: true },
  duration: { type: Number, required: true },
  link: { type: String, required: true },
  bannerImage: { type: String },
  backgroundColor: { type: String },
  password: { type: String },
  status: {
    type: String,
    enum: ['upcoming', 'pending', 'canceled', 'active', 'deactivated'],
    default: 'upcoming',
  },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Event', EventSchema);