const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  firstName:{type:String, required:true},
  lastName:{type:String, required:true},
  // username: { type: String, required: true, unique: true, trim: true },
  email: { type: String, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', UserSchema);