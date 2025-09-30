// models/associations.js
const User = require('./User');
const ChatMessage = require('./ChatMessage');

// Define associations
User.hasMany(ChatMessage, {
  foreignKey: 'userId',
  as: 'chatMessages'
});

ChatMessage.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user'
});

module.exports = {
  User,
  ChatMessage
};