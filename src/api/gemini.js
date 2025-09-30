import axios from 'axios';

const GEMINI_API_ENDPOINT = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

export const geminiAPI = {
  /**
   * Send a message to Gemini AI and get a response
   * @param {string} message - The user's message
   * @param {Array} history - Previous conversation history
   * @param {string} language - Language preference ('en' or 'ml')
   * @returns {Promise<Object>} - API response
   */
  sendMessage: async (message, history = [], language = 'en') => {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY || 'AIzaSyDt2oax1jQxa-Relo2e8mhfpoeZ089QhEg';
    
    if (!apiKey) {
      throw new Error('Gemini API key is not configured.');
    }

    try {
      // Simple message format for Gemini
      const systemPrompt = language === 'ml' 
        ? 'നിങ്ങൾ കൃഷി സഖി എന്ന കാർഷിക AI സഹായിയാണ്. കേരളത്തിലെ കർഷകർക്ക് കൃഷി സംബന്ധമായ ചോദ്യങ്ങൾക്ക് ഉത്തരം നൽകുക.'
        : 'You are Krishi Sakhi, an agricultural AI assistant. Help farmers with agricultural queries, farming techniques, crop management, and related topics.';
      
      const fullMessage = `${systemPrompt}\n\nUser: ${message}\n\nAssistant:`;
      
      const contents = [{
        parts: [{
          text: fullMessage
        }]
      }];

      const response = await axios.post(
        `${GEMINI_API_ENDPOINT}?key=${apiKey}`,
        {
          contents,
          generationConfig: {
            temperature: 0.7,
            topK: 1,
            topP: 1,
            maxOutputTokens: 2048,
          },
          safetySettings: [
            {
              category: 'HARM_CATEGORY_HARASSMENT',
              threshold: 'BLOCK_MEDIUM_AND_ABOVE'
            },
            {
              category: 'HARM_CATEGORY_HATE_SPEECH',
              threshold: 'BLOCK_MEDIUM_AND_ABOVE'
            },
            {
              category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
              threshold: 'BLOCK_MEDIUM_AND_ABOVE'
            },
            {
              category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
              threshold: 'BLOCK_MEDIUM_AND_ABOVE'
            }
          ]
        }
      );

      if (response.data.candidates && response.data.candidates[0]) {
        const botResponse = response.data.candidates[0].content.parts[0].text;
        return {
          success: true,
          data: {
            botMessage: {
              id: `bot-${Date.now()}`,
              type: 'bot',
              message: botResponse,
              created_at: new Date().toISOString()
            }
          }
        };
      } else {
        throw new Error('No response from Gemini API');
      }
    } catch (error) {
      console.error('Gemini API Error:', error);
      
      // Handle specific errors
      if (error.response?.status === 429) {
        throw new Error('Rate limit exceeded. Please try again in a moment.');
      } else if (error.response?.status === 403) {
        throw new Error('API key is invalid or doesn\'t have access to Gemini API.');
      }
      
      throw new Error('Failed to get response from AI assistant.');
    }
  }
};

export default geminiAPI;