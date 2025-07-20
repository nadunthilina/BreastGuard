const DetectionResult = require('../models/detectionModel');
const axios = require('axios');
const crypto = require('crypto');
const config = require('../config/config');

// @desc    Process image for breast cancer detection
// @route   POST /api/detection
// @access  Private
const detectBreastCancer = async (req, res) => {
  try {
    const { imageBase64 } = req.body;
    const userId = req.user._id;

    if (!imageBase64) {
      return res.status(400).json({ message: 'Image data is required' });
    }

    // Calculate image hash to potentially avoid duplicate analysis
    const imageHash = crypto
      .createHash('md5')
      .update(imageBase64)
      .digest('hex');

    // Forward the image to the Python Flask model service
    const modelResponse = await axios.post(`${config.modelServiceUrl}/predict`, {
      image: imageBase64
    });

    const { prediction, confidence, features } = modelResponse.data;

    // Save the detection result
    const detectionResult = await DetectionResult.create({
      userId,
      prediction,
      confidence,
      features,
      imageHash
    });

    res.status(201).json(detectionResult);
  } catch (error) {
    console.error('Detection Error:', error);
    const errorMessage = error.response?.data?.error || error.message;
    res.status(500).json({ 
      message: 'Error processing detection request', 
      details: errorMessage 
    });
  }
};

// @desc    Get detection history for a user
// @route   GET /api/detection/history
// @access  Private
const getDetectionHistory = async (req, res) => {
  try {
    const userId = req.user._id;

    const history = await DetectionResult.find({ userId })
      .sort({ timestamp: -1 });
    
    res.json(history);
  } catch (error) {
    console.error('Get History Error:', error);
    res.status(500).json({ message: 'Server error', details: error.message });
  }
};

// @desc    Get a specific detection result
// @route   GET /api/detection/:id
// @access  Private
const getDetectionById = async (req, res) => {
  try {
    const detectionId = req.params.id;
    const userId = req.user._id;

    const detection = await DetectionResult.findOne({ 
      _id: detectionId,
      userId
    });

    if (!detection) {
      return res.status(404).json({ message: 'Detection result not found' });
    }

    res.json(detection);
  } catch (error) {
    console.error('Get Detection Error:', error);
    res.status(500).json({ message: 'Server error', details: error.message });
  }
};

// @desc    Delete a detection record
// @route   DELETE /api/detection/:id
// @access  Private
const deleteDetection = async (req, res) => {
  try {
    const detectionId = req.params.id;
    const userId = req.user._id;

    // Find the detection record
    const detection = await DetectionResult.findOne({ 
      _id: detectionId,
      userId
    });

    if (!detection) {
      return res.status(404).json({ message: 'Detection record not found' });
    }

    // Delete the record
    await DetectionResult.findByIdAndDelete(detectionId);
    
    res.json({ message: 'Detection record deleted successfully' });
  } catch (error) {
    console.error('Delete Detection Error:', error);
    res.status(500).json({ message: 'Server error', details: error.message });
  }
};

// @desc    Update notes for a detection record
// @route   PUT /api/detection/:id/notes
// @access  Private
const updateDetectionNotes = async (req, res) => {
  try {
    const detectionId = req.params.id;
    const userId = req.user._id;
    const { notes } = req.body;

    if (notes === undefined) {
      return res.status(400).json({ message: 'Notes field is required' });
    }

    // Find and update the detection record
    const detection = await DetectionResult.findOneAndUpdate(
      { _id: detectionId, userId },
      { notes },
      { new: true } // Return the updated document
    );

    if (!detection) {
      return res.status(404).json({ message: 'Detection record not found' });
    }

    res.json(detection);
  } catch (error) {
    console.error('Update Notes Error:', error);
    res.status(500).json({ message: 'Server error', details: error.message });
  }
};

module.exports = {
  detectBreastCancer,
  getDetectionHistory,
  getDetectionById,
  deleteDetection,
  updateDetectionNotes
};
