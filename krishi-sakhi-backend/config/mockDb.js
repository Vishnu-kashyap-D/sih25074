// Mock database setup for development when SQL database is not available
const mockUsers = new Map();
const mockChatMessages = new Map();

// Mock User model
const MockUser = {
  create: async (userData) => {
    const id = mockUsers.size + 1;
    const user = {
      id,
      ...userData,
      created_at: new Date(),
      updated_at: new Date()
    };
    mockUsers.set(id, user);
    
    return {
      ...user,
      toJSON: () => {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
      },
      comparePassword: async (candidatePassword) => {
        const bcrypt = require('bcryptjs');
        return bcrypt.compare(candidatePassword, user.password);
      },
      save: async () => {
        user.updated_at = new Date();
        mockUsers.set(user.id, user);
        return user;
      }
    };
  },

  findOne: async (options) => {
    const users = Array.from(mockUsers.values());
    if (options.where && options.where.email) {
      const user = users.find(u => u.email === options.where.email);
      return user ? {
        ...user,
        comparePassword: async (candidatePassword) => {
          const bcrypt = require('bcryptjs');
          return bcrypt.compare(candidatePassword, user.password);
        },
        save: async () => {
          user.updated_at = new Date();
          mockUsers.set(user.id, user);
          return user;
        },
        toJSON: () => {
          const { password, ...userWithoutPassword } = user;
          return userWithoutPassword;
        }
      } : null;
    }
    return null;
  },

  findByPk: async (id) => {
    const user = mockUsers.get(parseInt(id));
    return user ? {
      ...user,
      toJSON: () => {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
      }
    } : null;
  },

  update: async (updateData, options) => {
    if (options.where && options.where.id) {
      const user = mockUsers.get(options.where.id);
      if (user) {
        Object.assign(user, updateData, { updated_at: new Date() });
        mockUsers.set(options.where.id, user);
        return [1]; // Return updated rows count
      }
    }
    return [0];
  }
};

// Mock ChatMessage model
const MockChatMessage = {
  create: async (messageData) => {
    const id = mockChatMessages.size + 1;
    const message = {
      id,
      ...messageData,
      created_at: new Date(),
      updated_at: new Date()
    };
    mockChatMessages.set(id, message);
    return message;
  },

  findAll: async (options) => {
    const messages = Array.from(mockChatMessages.values());
    if (options.where && options.where.sessionId) {
      return messages
        .filter(m => m.sessionId === options.where.sessionId)
        .slice(0, options.limit || 50);
    }
    return messages.slice(0, options.limit || 50);
  },

  findByPk: async (id) => {
    return mockChatMessages.get(parseInt(id)) || null;
  },

  update: async (updateData, options) => {
    if (options.where && options.where.id) {
      const message = mockChatMessages.get(options.where.id);
      if (message) {
        Object.assign(message, updateData, { updated_at: new Date() });
        mockChatMessages.set(options.where.id, message);
        return [1, [message]]; // Return [updatedRowsCount, updatedRows]
      }
    }
    return [0, []];
  }
};

module.exports = {
  MockUser,
  MockChatMessage,
  initializeMockDb: () => {
    console.log('🔧 Using mock database for development');
    return Promise.resolve();
  }
};