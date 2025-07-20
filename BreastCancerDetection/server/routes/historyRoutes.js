// Backend route implementation for the detectionRoutes.js file

const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const Detection = require('../models/detectionModel');

// @route   GET /api/users/history
// @desc    Get all detection history for logged in user
// @access  Private
router.get('/history', auth, async (req, res) => {
  try {
    const detections = await Detection.find({ user: req.user.id }).sort({ date: -1 });
    res.json(detections);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST /api/users/history
// @desc    Add a new detection record to user history
// @access  Private
router.post('/history', auth, async (req, res) => {
  try {
    const { diagnosis, confidence, imageUrl, date, details } = req.body;

    // Create new detection record
    const newDetection = new Detection({
      user: req.user.id,
      diagnosis,
      confidence,
      imageUrl,
      date: date || Date.now(),
      details
    });

    const detection = await newDetection.save();
    res.json(detection);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE /api/users/history/:id
// @desc    Delete a detection record
// @access  Private
router.delete('/history/:id', auth, async (req, res) => {
  try {
    let detection = await Detection.findById(req.params.id);
    
    // Check if record exists
    if (!detection) {
      return res.status(404).json({ msg: 'Record not found' });
    }
    
    // Make sure user owns the record
    if (detection.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }
    
    await Detection.findByIdAndRemove(req.params.id);
    
    res.json({ msg: 'Record removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
