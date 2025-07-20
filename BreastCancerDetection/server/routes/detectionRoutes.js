const express = require('express');
const router = express.Router();
const { 
  detectBreastCancer, 
  getDetectionHistory, 
  getDetectionById,
  deleteDetection,
  updateDetectionNotes
} = require('../controllers/detectionController');
const authMiddleware = require('../middleware/authMiddleware');

// All routes are protected
router.use(authMiddleware);

router.post('/', detectBreastCancer);
router.get('/history', getDetectionHistory);
router.get('/:id', getDetectionById);
router.delete('/:id', deleteDetection);
router.put('/:id/notes', updateDetectionNotes);

module.exports = router;
