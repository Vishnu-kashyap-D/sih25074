import React from 'react';
import { FaUser, FaRobot, FaThumbsUp, FaThumbsDown, FaCheckCircle } from 'react-icons/fa';

const ChatMessage = ({ message, onFeedback }) => {
  const isBot = message.type === 'bot';
  const isError = message.isError;

  const handleFeedback = (helpful) => {
    if (onFeedback && message.id) {
      onFeedback(message.id, helpful);
    }
  };

  return (
    <div className={`flex items-start space-x-3 ${isBot ? '' : 'flex-row-reverse space-x-reverse'}`}>
      {/* Avatar */}
      <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
        isBot 
          ? 'bg-primary-600 text-white' 
          : 'bg-blue-600 text-white'
      }`}>
        {isBot ? <FaRobot size={20} /> : <FaUser size={18} />}
      </div>

      {/* Message Content */}
      <div className={`flex-1 max-w-[80%] ${isBot ? '' : 'flex flex-col items-end'}`}>
        <div className={`rounded-2xl px-4 py-3 ${
          isBot
            ? isError 
              ? 'bg-red-100 text-red-900'
              : 'bg-white shadow-md'
            : 'bg-blue-600 text-white'
        }`}>
          <p className="text-sm md:text-base whitespace-pre-wrap break-words">
            {message.message}
          </p>

          {/* Metadata */}
          {message.metadata && (
            <div className="mt-2 pt-2 border-t border-gray-200 text-xs text-gray-500">
              <div className="flex items-center space-x-2">
                <span>⚡ {message.metadata.processingTime}ms</span>
                {message.metadata.model && (
                  <span>• 🤖 {message.metadata.model}</span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Timestamp */}
        <p className={`text-xs text-gray-500 mt-1 ${isBot ? 'text-left' : 'text-right'}`}>
          {new Date(message.created_at).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </p>

        {/* Feedback Buttons (Only for bot messages) */}
        {isBot && !isError && message.id !== 'welcome' && (
          <div className="mt-2 flex items-center space-x-2">
            {message.feedbackSubmitted ? (
              <div className="flex items-center space-x-1 text-green-600 text-xs">
                <FaCheckCircle size={12} />
                <span>Thanks for feedback!</span>
              </div>
            ) : (
              <>
                <button
                  onClick={() => handleFeedback(true)}
                  className="p-1.5 rounded-full hover:bg-green-100 text-gray-500 hover:text-green-600 transition-colors"
                  title="Helpful"
                  aria-label="Mark as helpful"
                >
                  <FaThumbsUp size={14} />
                </button>
                <button
                  onClick={() => handleFeedback(false)}
                  className="p-1.5 rounded-full hover:bg-red-100 text-gray-500 hover:text-red-600 transition-colors"
                  title="Not helpful"
                  aria-label="Mark as not helpful"
                >
                  <FaThumbsDown size={14} />
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;