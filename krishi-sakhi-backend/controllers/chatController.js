const chatbotService = require('../services/chatbotService');
const { v4: uuidv4 } = require('uuid');

// Send message to chatbot
const sendMessage = async (req, res) => {
  try {
    const { message, sessionId, language, context, isVoice } = req.body;
    const user = req.user; // From auth middleware (optional)

    // Validation
    if (!message) {
      return res.status(400).json({
        error: 'Message is required'
      });
    }

    // Generate session ID if not provided
    const chatSessionId = sessionId || uuidv4();

    // Build context from request and user data
    const chatContext = {
      language: language || 'en',
      farmLocation: context?.farmLocation || user?.location,
      cropType: context?.cropType,
      season: context?.season,
      farmSize: context?.farmSize || user?.farmDetails?.totalAcres,
      isVoice: isVoice || false,
      queryTime: new Date().toISOString()
    };

    // Process chat request with voice context if applicable
    let result;
    if (isVoice) {
      // For voice queries, add voice-specific processing
      result = await chatbotService.processVoiceRequest(
        chatSessionId,
        message,
        user,
        chatContext
      );
    } else {
      result = await chatbotService.processChatRequest(
        chatSessionId,
        message,
        user,
        chatContext
      );
    }

    res.json({
      success: true,
      data: {
        sessionId: chatSessionId,
        userMessage: result.userMessage,
        botMessage: result.botMessage,
        context: chatContext,
        isVoice: isVoice || false
      },
      response: result.botMessage.message // For compatibility with voice assistant
    });

  } catch (error) {
    console.error('Chat message error:', error);
    res.status(500).json({
      error: 'Failed to process message',
      details: error.message
    });
  }
};

// Get chat history for a session
const getChatHistory = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const { limit = 50 } = req.query;

    if (!sessionId) {
      return res.status(400).json({
        error: 'Session ID is required'
      });
    }

    const messages = await chatbotService.getChatHistory(
      sessionId, 
      parseInt(limit)
    );

    res.json({
      success: true,
      data: {
        sessionId,
        messages,
        count: messages.length
      }
    });

  } catch (error) {
    console.error('Get chat history error:', error);
    res.status(500).json({
      error: 'Failed to fetch chat history',
      details: error.message
    });
  }
};

// Update message feedback
const updateFeedback = async (req, res) => {
  try {
    const { messageId } = req.params;
    const { helpful, rating, comment } = req.body;

    if (!messageId) {
      return res.status(400).json({
        error: 'Message ID is required'
      });
    }

    const feedback = {};
    if (helpful !== undefined) feedback.helpful = helpful;
    if (rating !== undefined) feedback.rating = rating;
    if (comment !== undefined) feedback.comment = comment;

    const updatedMessage = await chatbotService.updateMessageFeedback(
      messageId,
      feedback
    );

    if (!updatedMessage) {
      return res.status(404).json({
        error: 'Message not found'
      });
    }

    res.json({
      success: true,
      data: {
        message: updatedMessage
      },
      message: 'Feedback updated successfully'
    });

  } catch (error) {
    console.error('Update feedback error:', error);
    res.status(500).json({
      error: 'Failed to update feedback',
      details: error.message
    });
  }
};

// Get popular questions for quick replies
const getPopularQuestions = async (req, res) => {
  try {
    const { language = 'en' } = req.query;
    
    const questions = chatbotService.getPopularQuestions();
    
    // Filter by language if specified
    let filteredQuestions = questions.filter(cat => 
      cat.category !== 'malayalam'
    );

    res.json({
      success: true,
      data: {
        questions: filteredQuestions,
        language
      }
    });

  } catch (error) {
    console.error('Get popular questions error:', error);
    res.status(500).json({
      error: 'Failed to fetch popular questions',
      details: error.message
    });
  }
};

// Get user's chat sessions
const getChatSessions = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        error: 'Authentication required'
      });
    }

    // This would require aggregating chat sessions from ChatMessage collection
    // For now, return a placeholder response
    const sessions = [
      {
        sessionId: 'sample-session-1',
        lastMessage: 'How to improve soil quality?',
        lastActivity: new Date(),
        messageCount: 15
      }
    ];

    res.json({
      success: true,
      data: {
        sessions
      }
    });

  } catch (error) {
    console.error('Get chat sessions error:', error);
    res.status(500).json({
      error: 'Failed to fetch chat sessions',
      details: error.message
    });
  }
};

// Create new chat session
const createSession = async (req, res) => {
  try {
    const sessionId = uuidv4();
    const { initialMessage, context } = req.body;

    let result = null;
    if (initialMessage) {
      // Process initial message if provided
      const chatContext = {
        language: context?.language || 'en',
        farmLocation: context?.farmLocation || req.user?.location,
        cropType: context?.cropType,
        season: context?.season,
        farmSize: context?.farmSize || req.user?.farmDetails?.totalAcres
      };

      result = await chatbotService.processChatRequest(
        sessionId,
        initialMessage,
        req.user,
        chatContext
      );
    }

    res.status(201).json({
      success: true,
      data: {
        sessionId,
        ...(result && {
          userMessage: result.userMessage,
          botMessage: result.botMessage
        })
      },
      message: 'Chat session created successfully'
    });

  } catch (error) {
    console.error('Create session error:', error);
    res.status(500).json({
      error: 'Failed to create chat session',
      details: error.message
    });
  }
};

module.exports = {
  sendMessage,
  getChatHistory,
  updateFeedback,
  getPopularQuestions,
  getChatSessions,
  createSession
};