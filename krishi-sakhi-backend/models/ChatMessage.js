const { DataTypes } = require('sequelize');

let ChatMessage;

try {
  const { sequelize } = require('../config/db');

  ChatMessage = sequelize.define('ChatMessage', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    sessionId: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    type: {
      type: DataTypes.ENUM('user', 'bot', 'system'),
      allowNull: false
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    language: {
      type: DataTypes.ENUM('en', 'ml', 'hi'),
      defaultValue: 'en'
    },
    context: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: {}
    },
    metadata: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: {}
    },
    attachments: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: []
    },
    feedback: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: {}
    },
    isRead: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    isPinned: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    tableName: 'chat_messages',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [
      {
        fields: ['sessionId', 'created_at']
      },
      {
        fields: ['userId', 'created_at']
      },
      {
        fields: ['type']
      }
    ]
  });

  // Virtual for conversation context
  ChatMessage.prototype.getConversationContext = function() {
    return {
      sessionId: this.sessionId,
      messageCount: this.context?.previousMessages || 0,
      location: this.context?.farmLocation,
      crop: this.context?.cropType
    };
  };

} catch (error) {
  console.warn('⚠️ Sequelize ChatMessage model failed, using mock:', error.message);
  const { MockChatMessage } = require('../config/mockDb');
  ChatMessage = MockChatMessage;
}

module.exports = ChatMessage;