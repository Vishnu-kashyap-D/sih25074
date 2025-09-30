import React, { useState, useEffect, useRef } from 'react';
import { FaMicrophone, FaMicrophoneSlash, FaVolumeUp, FaVolumeMute, FaLanguage, FaStop } from 'react-icons/fa';
import { 
  isSpeechRecognitionSupported, 
  isSpeechSynthesisSupported,
  voiceLanguages,
  listenForSpeech,
  speakText,
  getGreeting,
  commonQueries
} from '../utils/voiceUtils';
import { chatAPI } from '../api/services';

const VoiceAssistant = () => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en-IN');
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [conversationHistory, setConversationHistory] = useState([]);
  
  const recognitionRef = useRef(null);
  const sessionId = useRef(Date.now().toString());

  useEffect(() => {
    // Check browser support
    if (!isSpeechRecognitionSupported() || !isSpeechSynthesisSupported()) {
      setError('Your browser does not support voice features. Please use Chrome or Edge.');
      return;
    }

    // Load voices when ready
    if (window.speechSynthesis) {
      window.speechSynthesis.getVoices();
      window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.getVoices();
      };
    }

    // Greet user on component mount
    const greeting = getGreeting(selectedLanguage);
    setResponse(greeting);
    if (voiceEnabled) {
      speakText(greeting, selectedLanguage).catch(err => {
        console.error('Error speaking greeting:', err);
      });
    }
  }, []);

  const startListening = () => {
    if (isListening || isSpeaking || isProcessing) return;

    setTranscript('');
    setError('');
    setIsListening(true);

    recognitionRef.current = listenForSpeech(
      selectedLanguage,
      (result) => {
        if (result.interim) {
          setTranscript(result.interim);
        }
        if (result.isFinal && result.final) {
          setTranscript(result.final);
          stopListening();
          processQuery(result.final);
        }
      },
      (error) => {
        setError(`Error: ${error}`);
        stopListening();
      }
    );
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
    setIsListening(false);
  };

  const processQuery = async (query) => {
    if (!query.trim()) return;

    setIsProcessing(true);
    setResponse('');

    // Add to conversation history
    const userMessage = { type: 'user', text: query, timestamp: new Date() };
    setConversationHistory(prev => [...prev, userMessage]);

    try {
      // Send to backend with language info
      const result = await chatAPI.sendMessage(
        query, // message
        sessionId.current, // sessionId
        {
          language: selectedLanguage,
          isVoice: true
        } // context
      );

      const aiResponse = result.response || result.data?.botMessage?.message || 'Sorry, I could not process your request.';
      setResponse(aiResponse);

      // Add AI response to history
      const aiMessage = { type: 'ai', text: aiResponse, timestamp: new Date() };
      setConversationHistory(prev => [...prev, aiMessage]);

      // Speak the response
      if (voiceEnabled) {
        setIsSpeaking(true);
        await speakText(aiResponse, selectedLanguage);
        setIsSpeaking(false);
      }
    } catch (error) {
      console.error('Error processing query:', error);
      
      // Check if it's a network error or API error
      let errorMessage;
      if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else if (error.message) {
        errorMessage = error.message;
      } else {
        errorMessage = selectedLanguage.startsWith('hi') 
          ? 'क्षमा करें, कुछ समस्या हुई है। कृपया फिर से प्रयास करें।'
          : 'Sorry, something went wrong. Please try again.';
      }
      
      setResponse(errorMessage);
      setError(errorMessage);
      
      // Add error to conversation history
      const errorMsg = { type: 'ai', text: errorMessage, timestamp: new Date(), isError: true };
      setConversationHistory(prev => [...prev, errorMsg]);
      
      if (voiceEnabled) {
        await speakText(errorMessage, selectedLanguage).catch(err => {
          console.error('Error speaking error message:', err);
        });
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  const handleLanguageChange = (e) => {
    const newLang = e.target.value;
    setSelectedLanguage(newLang);
    
    // Greet in new language
    const greeting = getGreeting(newLang);
    setResponse(greeting);
    if (voiceEnabled) {
      speakText(greeting, newLang);
    }
  };

  const handleQueryClick = (query) => {
    setTranscript(query);
    processQuery(query);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Voice Assistant Header */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white p-4 rounded-t-lg">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Voice Assistant</h3>
          <div className="flex items-center gap-4">
            {/* Language Selector */}
            <div className="flex items-center gap-2">
              <FaLanguage />
              <select
                value={selectedLanguage}
                onChange={handleLanguageChange}
                className="bg-white/20 border border-white/30 rounded px-2 py-1 text-sm"
                disabled={isListening || isSpeaking}
              >
                {voiceLanguages.map(lang => (
                  <option key={lang.code} value={lang.code} className="text-gray-800">
                    {lang.display}
                  </option>
                ))}
              </select>
            </div>

            {/* Voice Toggle */}
            <button
              onClick={() => setVoiceEnabled(!voiceEnabled)}
              className="p-2 hover:bg-white/20 rounded transition-colors"
              title={voiceEnabled ? 'Mute voice' : 'Unmute voice'}
            >
              {voiceEnabled ? <FaVolumeUp /> : <FaVolumeMute />}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col p-6 space-y-4 overflow-hidden">
        {/* Voice Visualization */}
        <div className="flex flex-col items-center justify-center space-y-4">
          {/* Microphone Button */}
          <button
            onClick={isListening ? stopListening : startListening}
            disabled={isProcessing || isSpeaking}
            className={`relative p-8 rounded-full transition-all duration-300 ${
              isListening 
                ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
                : 'bg-primary-600 hover:bg-primary-700'
            } ${(isProcessing || isSpeaking) ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isListening ? (
              <FaMicrophoneSlash className="text-white text-4xl" />
            ) : (
              <FaMicrophone className="text-white text-4xl" />
            )}
            
            {/* Listening Animation */}
            {isListening && (
              <div className="absolute inset-0 rounded-full">
                <div className="absolute inset-0 rounded-full bg-red-400 animate-ping"></div>
                <div className="absolute inset-0 rounded-full bg-red-400 animate-ping animation-delay-200"></div>
              </div>
            )}
          </button>

          {/* Status Text */}
          <p className="text-lg font-medium text-gray-700">
            {isListening && 'Listening...'}
            {isProcessing && 'Processing...'}
            {isSpeaking && 'Speaking...'}
            {!isListening && !isProcessing && !isSpeaking && 'Tap to speak'}
          </p>
        </div>

        {/* Transcript Display */}
        {transcript && (
          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">You said:</p>
            <p className="text-lg text-gray-800">{transcript}</p>
          </div>
        )}

        {/* Response Display */}
        {response && (
          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm text-gray-600 mb-1">Assistant:</p>
                <p className="text-lg text-gray-800">{response}</p>
              </div>
              {isSpeaking && (
                <button
                  onClick={stopSpeaking}
                  className="ml-4 p-2 text-red-600 hover:bg-red-50 rounded"
                  title="Stop speaking"
                >
                  <FaStop />
                </button>
              )}
            </div>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 rounded-lg p-4">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {/* Common Queries */}
        <div className="mt-auto">
          <p className="text-sm text-gray-600 mb-2">Try asking:</p>
          <div className="flex flex-wrap gap-2">
            {(commonQueries[selectedLanguage] || commonQueries['en-IN']).slice(0, 3).map((query, index) => (
              <button
                key={index}
                onClick={() => handleQueryClick(query)}
                disabled={isListening || isProcessing || isSpeaking}
                className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700 transition-colors disabled:opacity-50"
              >
                {query}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Conversation History (Collapsed by default) */}
      <details className="border-t p-4">
        <summary className="cursor-pointer font-medium text-gray-700">
          Conversation History
        </summary>
        <div className="mt-2 space-y-2 max-h-40 overflow-y-auto">
          {conversationHistory.map((msg, index) => (
            <div key={index} className={`p-2 rounded text-sm ${
              msg.type === 'user' ? 'bg-blue-50 text-right' : 'bg-green-50'
            }`}>
              <p className="font-medium">{msg.type === 'user' ? 'You' : 'Assistant'}</p>
              <p>{msg.text}</p>
              <p className="text-xs text-gray-500 mt-1">
                {msg.timestamp.toLocaleTimeString()}
              </p>
            </div>
          ))}
        </div>
      </details>
    </div>
  );
};

export default VoiceAssistant;