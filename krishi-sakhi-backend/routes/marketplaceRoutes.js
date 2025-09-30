const express = require('express');
const router = express.Router();
const marketplaceController = require('../controllers/marketplaceController');
const { authenticate, optionalAuth } = require('../middleware/auth');
const rateLimit = require('express-rate-limit');

// Rate limiting for marketplace endpoints
const marketplaceLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    error: 'Too many marketplace requests, please try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Apply rate limiting to marketplace routes
router.use(marketplaceLimiter);

// Public routes
router.get('/products', optionalAuth, marketplaceController.getProducts);
router.get('/products/:id', optionalAuth, marketplaceController.getProductById);
router.get('/categories', marketplaceController.getCategories);

// Protected routes (require authentication)
router.use(authenticate); // Apply authentication middleware to routes below

router.post('/products', marketplaceController.createProduct);
router.put('/products/:id', marketplaceController.updateProduct);
router.delete('/products/:id', marketplaceController.deleteProduct);

module.exports = router;