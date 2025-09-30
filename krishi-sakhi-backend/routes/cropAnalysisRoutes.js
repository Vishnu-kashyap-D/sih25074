const express = require('express');
const router = express.Router();
const cropAnalysisController = require('../controllers/cropAnalysisController');

// Analyze crop image
router.post('/analyze', cropAnalysisController.analyzeCropImage);

// Get analysis history
router.get('/history/:userId', cropAnalysisController.getAnalysisHistory);

// Get supported crop types
router.get('/supported-crops', cropAnalysisController.getSupportedCrops);

// Get common diseases information
router.get('/diseases', cropAnalysisController.getCommonDiseases);

module.exports = router;