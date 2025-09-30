// routes/analysisRoutes.js
const express = require('express');
const router = express.Router();
const analysisController = require('../controllers/analysisController');

// Define the main analysis endpoint
router.post('/', analysisController.getFarmAnalysis);

module.exports = router;