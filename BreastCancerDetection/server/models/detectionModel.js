const mongoose = require('mongoose');

const detectionResultSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  prediction: {
    type: String,
    enum: ['benign', 'malignant'],
    required: true
  },
  confidence: {
    type: Number,
    required: true
  },
  features: {
    radius: Number,
    texture: Number,
    perimeter: Number,
    area: Number,
    smoothness: Number,
    compactness: Number,
    concavity: Number,
    concave_points: Number,
    symmetry: Number,
    fractal_dimension: Number
  },
  details: {
    age: Number,
    familyHistory: Boolean,
    previousTreatments: String,
    biopsyLocation: String,
    tumorSize: String,
    nodalStatus: String,
    estrogenReceptor: String,
    progesteroneReceptor: String,
    her2Status: String,
    grade: String,
    stageClassification: String,
    recommendedFollowUp: String
  },
  notes: {
    type: String,
    default: ""
  },
  imageHash: {
    type: String
  },
  imageUrl: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  uploadDate: {
    type: Date,
    default: Date.now
  }
});

const DetectionResult = mongoose.model('DetectionResult', detectionResultSchema);

module.exports = DetectionResult;
