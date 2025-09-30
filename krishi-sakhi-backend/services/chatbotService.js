const { GoogleGenerativeAI } = require('@google/generative-ai');

// Try to import ChatMessage model, but don't fail if it doesn't exist
let ChatMessage;
try {
  ChatMessage = require('../models/ChatMessage');
} catch (error) {
  console.warn('ChatMessage model not available, chat history will not be saved');
  ChatMessage = null;
}

// Initialize Gemini AI
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || 'AIzaSyDt2oax1jQxa-Relo2e8mhfpoeZ089QhEg';
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

// Agriculture-specific system prompt
const SYSTEM_PROMPT = `
You are Krishi Sakhi (कृषि सखी), an intelligent agricultural assistant for Indian farmers. You provide expert advice on:
- Crop selection and cultivation practices
- Soil health and fertilizer recommendations
- Pest and disease management
- Weather-based farming guidance
- Market prices and selling strategies
- Government agricultural schemes
- Modern farming techniques and technology
- Sustainable and organic farming practices

Guidelines:
1. Always provide practical, location-specific advice when possible
2. Consider Indian farming conditions, climate, and crops
3. Use simple, farmer-friendly language
4. Provide actionable recommendations with timing
5. Support multiple Indian languages when possible
6. Include warnings for harmful practices
7. Suggest cost-effective solutions
8. Emphasize sustainable farming practices

Context: You're helping farmers in India, primarily in Kerala, but also across other states. Consider monsoon seasons, local crops like rice, coconut, spices, vegetables, and traditional farming practices.
`;

// Voice-specific system prompt
const VOICE_SYSTEM_PROMPT = `
You are Krishi Sakhi (कृषि सखी), a voice-based agricultural assistant for Indian farmers. You are listening to farmers speaking in their local dialect and providing spoken responses.

Guidelines for voice responses:
1. Keep responses concise and clear for speech
2. Use simple, conversational language
3. Avoid technical jargon unless necessary
4. Structure responses for easy listening
5. Acknowledge the farmer's query first
6. Provide step-by-step instructions when needed
7. Speak in the same language as the query when possible
8. End with a clear next step or question

Remember: Your response will be spoken aloud, so make it natural and easy to understand.
`;

// Get model instance
const getModel = (isVoice = false) => {
  return genAI.getGenerativeModel({ 
    model: "gemini-1.5-flash",
    systemInstruction: isVoice ? VOICE_SYSTEM_PROMPT : SYSTEM_PROMPT
  });
};

// Generate chat response
const generateResponse = async (message, context = {}) => {
  try {
    const startTime = Date.now();
    const model = getModel(context.isVoice);

    // Build context-aware prompt
    let contextPrompt = message;
    
    // Add voice context if applicable
    if (context.isVoice) {
      contextPrompt = `Voice Query in ${context.language || 'Hindi'}: "${message}"\n\nProvide a clear, spoken response.`;
    }
    
    if (context.farmLocation) {
      contextPrompt += `\n\nFarm location: ${context.farmLocation.state || ''}, ${context.farmLocation.district || ''} (${context.farmLocation.lat}, ${context.farmLocation.lng})`;
    }
    
    if (context.cropType) {
      contextPrompt += `\nCurrent crop: ${context.cropType}`;
    }
    
    if (context.season) {
      contextPrompt += `\nSeason: ${context.season}`;
    }
    
    if (context.farmSize) {
      contextPrompt += `\nFarm size: ${context.farmSize} acres`;
    }

    // Add previous conversation context
    if (context.previousMessages && context.previousMessages.length > 0) {
      contextPrompt += '\n\nRecent conversation:';
      context.previousMessages.slice(-3).forEach((msg, index) => {
        contextPrompt += `\n${msg.type}: ${msg.message}`;
      });
    }

    // Generate response
    const result = await model.generateContent(contextPrompt);
    const response = await result.response;
    const text = response.text();
    
    const processingTime = Date.now() - startTime;

    return {
      message: text,
      metadata: {
        confidence: 0.85, // Placeholder - Gemini doesn't provide confidence scores
        processingTime,
        model: 'gemini-1.5-flash',
        tokens: {
          input: Math.ceil(contextPrompt.length / 4), // Rough estimate
          output: Math.ceil(text.length / 4)
        }
      }
    };

  } catch (error) {
    console.error('Gemini API error:', error);
    
    // Fallback response
    return {
      message: "I apologize, but I'm experiencing technical difficulties right now. Please try again in a few moments. In the meantime, you can check our community forum for answers to common farming questions.",
      metadata: {
        confidence: 0,
        processingTime: 0,
        model: 'fallback',
        error: error.message,
        tokens: { input: 0, output: 0 }
      }
    };
  }
};

// Save chat message to database
const saveChatMessage = async (messageData) => {
  try {
    const chatMessage = await ChatMessage.create({
      userId: messageData.user,
      sessionId: messageData.sessionId,
      type: messageData.type,
      message: messageData.message,
      language: messageData.language || 'en',
      context: messageData.context || {},
      metadata: messageData.metadata || {},
      attachments: messageData.attachments || [],
      feedback: messageData.feedback || {},
      isRead: messageData.isRead || false,
      isPinned: messageData.isPinned || false
    });
    return chatMessage;
  } catch (error) {
    console.error('Error saving chat message:', error);
    throw error;
  }
};

// Get chat history
const getChatHistory = async (sessionId, limit = 50) => {
  try {
    const messages = await ChatMessage.findAll({
      where: { sessionId },
      order: [['created_at', 'ASC']],
      limit: parseInt(limit),
      // Note: User association will be handled by Sequelize associations
      // include: [
      //   {
      //     model: User,
      //     as: 'user',
      //     attributes: ['name', 'avatar'],
      //     required: false
      //   }
      // ]
    });
    
    return messages;
  } catch (error) {
    console.error('Error fetching chat history:', error);
    throw error;
  }
};

// Get recent messages for context
const getRecentMessages = async (sessionId, limit = 5) => {
  try {
    const messages = await ChatMessage.findAll({
      where: { sessionId },
      order: [['created_at', 'DESC']],
      limit: parseInt(limit),
      attributes: ['type', 'message', 'created_at']
    });
    
    return messages.reverse(); // Return in chronological order
  } catch (error) {
    console.error('Error fetching recent messages:', error);
    return [];
  }
};

// Process chat request
const processChatRequest = async (sessionId, userMessage, user = null, context = {}) => {
  try {
    // If ChatMessage model is not available, use mock data
    if (!ChatMessage) {
      console.log('Using mock chat without database');
      const mockUserMessage = {
        id: `user-${Date.now()}`,
        sessionId,
        type: 'user',
        message: userMessage,
        created_at: new Date().toISOString()
      };
      
      // Generate AI response
      const aiResponse = await generateResponse(userMessage, context);
      
      const mockBotMessage = {
        id: `bot-${Date.now()}`,
        sessionId,
        type: 'bot',
        message: aiResponse.message,
        created_at: new Date().toISOString(),
        metadata: aiResponse.metadata
      };
      
      return {
        userMessage: mockUserMessage,
        botMessage: mockBotMessage
      };
    }
    // Save user message
    const userMessageData = {
      sessionId,
      type: 'user',
      message: userMessage,
      user: user?._id,
      language: context.language || 'en',
      context: {
        farmLocation: context.farmLocation,
        cropType: context.cropType,
        season: context.season,
        farmSize: context.farmSize,
        previousMessages: context.previousMessages || 0
      }
    };

    const savedUserMessage = await saveChatMessage(userMessageData);

    // Get recent conversation for context
    const recentMessages = await getRecentMessages(sessionId, 5);
    
    // Generate AI response
    const aiResponse = await generateResponse(userMessage, {
      ...context,
      previousMessages: recentMessages
    });

    // Save bot response
    const botMessageData = {
      sessionId,
      type: 'bot',
      message: aiResponse.message,
      language: context.language || 'en',
      context: {
        farmLocation: context.farmLocation,
        cropType: context.cropType,
        season: context.season,
        farmSize: context.farmSize,
        previousMessages: recentMessages.length + 1
      },
      metadata: aiResponse.metadata
    };

    const savedBotMessage = await saveChatMessage(botMessageData);

    return {
      userMessage: savedUserMessage,
      botMessage: savedBotMessage
    };

  } catch (error) {
    console.error('Error processing chat request:', error);
    throw error;
  }
};

// Update message feedback
const updateMessageFeedback = async (messageId, feedback) => {
  try {
    if (ChatMessage) {
      const [updatedRowsCount, updatedRows] = await ChatMessage.update(
        { feedback },
        { 
          where: { id: messageId },
          returning: true
        }
      );
      
      if (updatedRowsCount > 0) {
        return updatedRows[0] || await ChatMessage.findByPk(messageId);
      }
      return null;
    } else {
      // Return mock success if no database
      return { id: messageId, feedback };
    }
  } catch (error) {
    console.error('Error updating message feedback:', error);
    return { id: messageId, feedback }; // Return mock success on error
  }
};

// Get popular questions for quick replies
const getPopularQuestions = () => {
  return [
    {
      category: 'general',
      questions: [
        'What crops are best for my region?',
        'How do I test my soil quality?',
        'What fertilizer should I use?',
        'How to deal with pests naturally?'
      ]
    },
    {
      category: 'weather',
      questions: [
        'Should I irrigate before rain?',
        'How to protect crops from heavy rain?',
        'Best time to sow seeds?',
        'Drought management techniques?'
      ]
    }
  ];
};

// Process voice request with dialect handling
const processVoiceRequest = async (sessionId, voiceMessage, user = null, context = {}) => {
  try {
    // Enhanced context for voice queries
    const voiceContext = {
      ...context,
      isVoice: true,
      language: context.language || 'hi-IN',
      queryTime: context.queryTime || new Date().toISOString()
    };

    // Process as regular chat but with voice context
    const result = await processChatRequest(sessionId, voiceMessage, user, voiceContext);

    // Enhance response for voice
    if (result.botMessage && result.botMessage.message) {
      // Add voice-specific formatting if needed
      result.botMessage.message = result.botMessage.message
        .replace(/\n\n/g, '. ') // Replace double newlines with periods for better speech
        .replace(/\n/g, ', ') // Replace single newlines with commas
        .replace(/[*_]/g, ''); // Remove markdown formatting
    }

    return result;
  } catch (error) {
    console.error('Error processing voice request:', error);
    throw error;
  }
};

module.exports = {
  generateResponse,
  saveChatMessage,
  getChatHistory,
  processChatRequest,
  processVoiceRequest,
  updateMessageFeedback,
  getPopularQuestions,
  getRecentMessages
};
