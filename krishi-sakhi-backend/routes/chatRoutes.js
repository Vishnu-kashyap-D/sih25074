const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');
const { optionalAuth, authenticate } = require('../middleware/auth');
const rateLimit = require('express-rate-limit');

// Rate limiting for chat endpoints
const chatLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50, // limit each IP to 50 chat messages per windowMs
  message: {
    error: 'Too many chat requests, please try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Apply rate limiting to chat routes
router.use(chatLimiter);

// Public routes (work without authentication, but better with it)
router.post('/message', optionalAuth, chatController.sendMessage);
router.get('/popular-questions', chatController.getPopularQuestions);
router.get('/history/:sessionId', optionalAuth, chatController.getChatHistory);

// Routes that benefit from authentication but don't require it
router.post('/session', optionalAuth, chatController.createSession);

// Routes that require authentication
router.use(authenticate); // Apply authentication middleware to routes below

router.get('/sessions', chatController.getChatSessions);
router.put('/feedback/:messageId', chatController.updateFeedback);

module.exports = router;