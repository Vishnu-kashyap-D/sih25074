// config/db.js
const { Sequelize } = require('sequelize');
require('dotenv').config();

// Database configuration - using SQLite for simplicity
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: process.env.DB_PATH || './database/krishi_sakhi.db',
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
  define: {
    timestamps: true,
    underscored: false,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

// Test database connection
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully.');
  } catch (error) {
    console.error('❌ Unable to connect to database:', error);
  }
};

// Initialize database and create tables
const initializeDatabase = async () => {
  try {
    // Import models first
    require('../models/User');
    require('../models/ChatMessage');
    
    // Then import associations
    require('../models/associations');
    
    await sequelize.sync({ alter: process.env.NODE_ENV === 'development' });
    console.log('✅ Database tables synchronized.');
  } catch (error) {
    console.error('❌ Error synchronizing database:', error);
    throw error;
  }
};

module.exports = { 
  sequelize, 
  testConnection, 
  initializeDatabase 
};
