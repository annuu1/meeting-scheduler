const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middleware/auth');

// Signup
router.post('/signup', async (req, res) => {
  const {firstName, lastName, username=null, email, password } = req.body;
  // console.log(username)
  try {
    if (!email || !password) {
      return res.status(400).json({ success:false, message: 'All fields are required' });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ success:false, message: 'User already exists' });
    }

    const hashedPass = await bcrypt.hash(password, 10);

    const user = new User({ firstName, lastName, email, password: hashedPass });
    await user.save();
    res.status(201).json({success:true, message: 'User created' });
  } catch (error) {
    res.status(500).json({ success:false, error: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '4h' });
    const name = user.firstName+' '+user.lastName;
    res.json({ token, user:{ id: user._id, name } , success:true, message: "User Logged in successfully"});
  } catch (error) {
    res.status(500).json({success:false, error: error.message });
  }
});

// Get Profile
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({success:false, error: 'User not found' });
    res.json({success:true, user});
  } catch (error) {
    res.status(500).json({ success:false, error: error.message });
  }
});

// Update Profile (with logout on email/password change)
router.put('/profile', auth, async (req, res) => {
  const { firstName, lastName, username , email, password } = req.body;
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ success:false, error: 'User not found' });

    let shouldLogout = false;
    if (username) user.username = username;
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (email && email !== user.email) {
      user.email = email;
      shouldLogout = true;
    }
    const hashedPass = await bcrypt.hash(password, 10);
    if (password) {
      user.password = hashedPass;
      shouldLogout = true;
    }
    user.updatedAt = Date.now();
    await user.save();

    res.json({ success: true, message: 'Profile updated', shouldLogout });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});


// Check Username Availability
router.get('/check-username/:username', async (req, res) => {
  try {
    const { username } = req.params;
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.json({ available: false, message: 'Username already taken' });
    }
    res.json({ available: true, message: 'Username available' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Update Preferences (Protected Route)
router.put('/preferences', auth, async (req, res) => {
  const { username, preferences } = req.body;
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    if (username && username !== user.username) {
      const existingUsername = await User.findOne({ username });
      if (existingUsername) {
        return res.status(409).json({ success: false, message: 'Username already taken' });
      }
      user.username = username;
    }

    if (preferences) {
      user.preferences = preferences;
    }

    user.updatedAt = Date.now();
    await user.save();

    res.json({ 
      success: true, 
      message: 'Preferences updated', 
      user: { id: user._id, username: user.username, preferences: user.preferences } 
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});


module.exports = router;