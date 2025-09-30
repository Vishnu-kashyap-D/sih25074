const express = require('express');
const router = express.Router();
const weatherController = require('../controllers/weatherController');
const { optionalAuth } = require('../middleware/auth');
const rateLimit = require('express-rate-limit');

// Rate limiting for weather endpoints
const weatherLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 60, // limit each IP to 60 requests per windowMs
  message: {
    error: 'Too many weather requests, please try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Apply rate limiting to weather routes
router.use(weatherLimiter);

// Public weather routes
router.get('/current', optionalAuth, weatherController.getCurrentWeather);
router.get('/forecast', optionalAuth, weatherController.getWeatherForecast);
router.get('/agriculture', optionalAuth, weatherController.getAgricultureInsights);
router.get('/alerts', optionalAuth, weatherController.getWeatherAlerts);
router.post('/summary', optionalAuth, weatherController.getWeatherSummary);

module.exports = router;