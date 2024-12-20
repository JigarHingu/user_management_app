const express = require('express');
const protect = require('../middlewares/authMiddleware');
const User = require('../models/User');
const router = express.Router();

// Get user profile
router.get("/me", protect, async (req, res) => {
  try {
    res.json(req.user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Update user profile
router.put('/me', protect, async (req, res) => {
  const { username, age, phone } = req.body;

  if (!username || isNaN(age) || age < 0 || !/^[0-9]{10}$/.test(phone)) {
    return res.status(400).json({ message: 'Invalid input fields.' });
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { username, age, phone },
      { new: true }
    ).select('-password');

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;