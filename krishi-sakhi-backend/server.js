const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

// Import database configuration
const { testConnection, initializeDatabase } = require('./config/db');

// Import routes
const analysisRoutes = require('./routes/analysisRoutes');

// Only import new routes if they exist
let authRoutes, chatRoutes, marketplaceRoutes, weatherRoutes, languageRoutes, cropAnalysisRoutes, communityRoutes;
try {
  authRoutes = require('./routes/authRoutes');
  chatRoutes = require('./routes/chatRoutes');
  marketplaceRoutes = require('./routes/marketplaceRoutes');
  weatherRoutes = require('./routes/weatherRoutes');
  languageRoutes = require('./routes/languageRoutes');
  cropAnalysisRoutes = require('./routes/cropAnalysisRoutes');
  communityRoutes = require('./routes/communityRoutes');
} catch (error) {
  console.warn('Some routes not available:', error.message);
}

const app = express();
const PORT = process.env.PORT || 3001;

// Initialize database connection
const initDB = async () => {
  try {
    await testConnection();
    await initializeDatabase();
  } catch (error) {
    console.warn('⚠️ Database initialization failed, continuing without DB:', error.message);
  }
};

// Initialize database asynchronously
setTimeout(initDB, 1000);

// Middleware
app.use(helmet()); // Security headers
app.use(morgan('combined')); // Request logging
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json({ limit: '10mb' })); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true, limit: '10mb' })); // Parse URL-encoded bodies

// API Routes
app.use('/api/v1/analyze', analysisRoutes); // Farm analysis (existing)

// Conditionally use new routes if available
if (authRoutes) {
  app.use('/api/auth', authRoutes); // Authentication
}
if (chatRoutes) {
  app.use('/api/chat', chatRoutes); // AI Chatbot
}
if (marketplaceRoutes) {
  app.use('/api/marketplace', marketplaceRoutes); // Marketplace
}
if (weatherRoutes) {
  app.use('/api/weather', weatherRoutes); // Weather
}
if (languageRoutes) {
  app.use('/api/languages', languageRoutes); // Multilingual support
}
if (cropAnalysisRoutes) {
  app.use('/api/crop-analysis', cropAnalysisRoutes); // Crop analysis
}
if (communityRoutes) {
  app.use('/api/community', communityRoutes); // Community features
}

// Root route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Krishi Sakhi API Server - Enhanced',
    version: '2.0.0',
    features: [
      'Farm Analysis',
      'AI Chatbot (Gemini)',
      'User Authentication',
      'Marketplace',
      'Weather Integration',
      'Community Forum'
    ],
    endpoints: {
      farmAnalysis: 'POST /api/v1/analyze',
      auth: {
        register: 'POST /api/auth/register',
        login: 'POST /api/auth/login',
        profile: 'GET /api/auth/profile'
      },
      chat: {
        message: 'POST /api/chat/message',
        history: 'GET /api/chat/history/:sessionId',
        questions: 'GET /api/chat/popular-questions'
      },
      marketplace: {
        products: 'GET /api/marketplace/products',
        categories: 'GET /api/marketplace/categories',
        create: 'POST /api/marketplace/products'
      },
      weather: {
        current: 'GET /api/weather/current?lat=10.5276&lon=76.2144',
        forecast: 'GET /api/weather/forecast?lat=10.5276&lon=76.2144',
        agriculture: 'GET /api/weather/agriculture?lat=10.5276&lon=76.2144&crop=rice'
      },
      languages: {
        all: 'GET /api/languages',
        regional: 'GET /api/languages/region/:state',
        validate: 'GET /api/languages/validate/:languageCode',
        info: 'GET /api/languages/info/:languageCode'
      }
    },
    database: 'SQLite',
    uptime: process.uptime()
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke!', details: err.message });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});