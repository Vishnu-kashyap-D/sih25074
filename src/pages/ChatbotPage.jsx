import React, { useState, useEffect, useRef } from 'react';
import { geminiAPI } from '../api/gemini';
import ChatMessage from '../components/ChatMessage';
import ChatInput from '../components/ChatInput';
import PopularQuestions from '../components/PopularQuestions';
import { FaRobot, FaSpinner } from 'react-icons/fa';

const ChatbotPage = () => {
  const [sessionId, setSessionId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState('en');
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  // Initialize session on mount
  useEffect(() => {
    initializeSession();
  }, []);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const initializeSession = async () => {
    try {
      // Generate a session ID
      const newSessionId = `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      setSessionId(newSessionId);
      
      // Add welcome message
      setMessages([
        {
          id: 'welcome',
          type: 'bot',
          message: language === 'ml' 
            ? 'നമസ്കാരം! ഞാൻ കൃഷി സഖി, നിങ്ങളുടെ കൃഷി സഹായി. എനിക്ക് എങ്ങനെ സഹായിക്കാം?'
            : 'Hello! I am Krishi Sakhi, your agricultural assistant. How can I help you today?',
          created_at: new Date().toISOString(),
        },
      ]);
    } catch (error) {
      console.error('Failed to initialize session:', error);
      setError('Failed to start chat session. Please refresh the page.');
    }
  };

  const handleSendMessage = async (messageText) => {
    if (!messageText.trim() || !sessionId || isLoading) return;

    // Add user message to UI
    const userMessage = {
      id: `user-${Date.now()}`,
      type: 'user',
      message: messageText,
      created_at: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    try {
      // Use Gemini API with conversation history
      const response = await geminiAPI.sendMessage(messageText, messages, language);
      
      if (response.success) {
        const botMessage = {
          id: response.data.botMessage.id || `bot-${Date.now()}`,
          type: 'bot',
          message: response.data.botMessage.message,
          created_at: response.data.botMessage.created_at,
          metadata: response.data.botMessage.metadata,
        };
        setMessages((prev) => [...prev, botMessage]);
      }
    } catch (error) {
      console.error('Failed to send message:', error);
      setError('Failed to get response. Please try again.');
      
      // Add error message
      const errorMessage = {
        id: `error-${Date.now()}`,
        type: 'bot',
        message: "I'm sorry, I'm having trouble responding right now. Please try again in a moment.",
        created_at: new Date().toISOString(),
        isError: true,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickQuestion = (question) => {
    handleSendMessage(question);
  };

  const handleLanguageToggle = () => {
    setLanguage((prev) => (prev === 'en' ? 'ml' : 'en'));
  };

  const handleFeedback = async (messageId, helpful) => {
    try {
      // For now, just update the UI state
      // In production, you would send this to your backend
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === messageId ? { ...msg, feedbackSubmitted: true } : msg
        )
      );
    } catch (error) {
      console.error('Failed to submit feedback:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 h-[calc(100vh-180px)]">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-full">
        {/* Main Chat Area */}
        <div className="lg:col-span-3 bg-white rounded-xl shadow-lg flex flex-col h-full">
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white p-4 rounded-t-xl flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-white bg-opacity-20 p-2 rounded-full">
                <FaRobot size={24} />
              </div>
              <div>
                <h2 className="text-xl font-bold">
                  {language === 'ml' ? 'കൃഷി സഖി' : 'Krishi Sakhi'}
                </h2>
                <p className="text-sm text-primary-100">
                  {language === 'ml' ? 'AI കൃഷി സഹായി' : 'AI Agricultural Assistant'}
                </p>
              </div>
            </div>
            
            <button
              onClick={handleLanguageToggle}
              className="bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg transition-colors text-sm font-medium"
            >
              {language === 'en' ? '🇮🇳 മലയാളം' : '🇬🇧 English'}
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                message={message}
                onFeedback={handleFeedback}
              />
            ))}
            
            {isLoading && (
              <div className="flex items-center space-x-2 text-gray-500">
                <FaSpinner className="animate-spin" />
                <span className="text-sm">
                  {language === 'ml' ? 'ചിന്തിക്കുന്നു...' : 'Thinking...'}
                </span>
              </div>
            )}
            
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input */}
          <div className="border-t border-gray-200 p-4 bg-white rounded-b-xl">
            <ChatInput
              onSendMessage={handleSendMessage}
              disabled={!sessionId || isLoading}
              language={language}
            />
          </div>
        </div>

        {/* Sidebar - Popular Questions */}
        <div className="lg:col-span-1">
          <PopularQuestions
            onQuestionClick={handleQuickQuestion}
            language={language}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatbotPage;