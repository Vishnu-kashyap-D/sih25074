// Voice Recognition and Synthesis Utilities

// Check if browser supports speech recognition
export const isSpeechRecognitionSupported = () => {
  return 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window;
};

// Check if browser supports speech synthesis
export const isSpeechSynthesisSupported = () => {
  return 'speechSynthesis' in window;
};

// Language configurations for voice
export const voiceLanguages = [
  { code: 'en-IN', name: 'English (India)', display: 'English' },
  { code: 'hi-IN', name: 'Hindi', display: 'हिंदी' },
  { code: 'pa-IN', name: 'Punjabi', display: 'ਪੰਜਾਬੀ' },
  { code: 'bn-IN', name: 'Bengali', display: 'বাংলা' },
  { code: 'gu-IN', name: 'Gujarati', display: 'ગુજરાતી' },
  { code: 'mr-IN', name: 'Marathi', display: 'मराठी' },
  { code: 'ta-IN', name: 'Tamil', display: 'தமிழ்' },
  { code: 'te-IN', name: 'Telugu', display: 'తెలుగు' },
  { code: 'kn-IN', name: 'Kannada', display: 'ಕನ್ನಡ' },
  { code: 'ml-IN', name: 'Malayalam', display: 'മലയാളം' }
];

// Create speech recognition instance
export const createSpeechRecognition = (language = 'en-IN') => {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  
  if (!SpeechRecognition) {
    throw new Error('Speech recognition not supported');
  }

  const recognition = new SpeechRecognition();
  recognition.lang = language;
  recognition.continuous = false;
  recognition.interimResults = true;
  recognition.maxAlternatives = 1;

  return recognition;
};

// Text to speech function
export const speakText = (text, language = 'en-IN', rate = 0.9, pitch = 1.0) => {
  return new Promise((resolve, reject) => {
    if (!isSpeechSynthesisSupported()) {
      reject(new Error('Speech synthesis not supported'));
      return;
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language;
    utterance.rate = rate;
    utterance.pitch = pitch;
    utterance.volume = 1.0;

    // Find the best voice for the language
    const voices = window.speechSynthesis.getVoices();
    const voice = voices.find(v => v.lang === language) || 
                  voices.find(v => v.lang.startsWith(language.split('-')[0]));
    
    if (voice) {
      utterance.voice = voice;
    }

    utterance.onend = () => resolve();
    utterance.onerror = (error) => reject(error);

    window.speechSynthesis.speak(utterance);
  });
};

// Convert speech to text
export const listenForSpeech = (language = 'en-IN', onResult, onError) => {
  try {
    const recognition = createSpeechRecognition(language);
    let finalTranscript = '';

    recognition.onresult = (event) => {
      let interimTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript;
        } else {
          interimTranscript += transcript;
        }
      }

      onResult({
        final: finalTranscript,
        interim: interimTranscript,
        isFinal: event.results[event.results.length - 1].isFinal
      });
    };

    recognition.onerror = (event) => {
      onError(event.error);
    };

    recognition.onend = () => {
      if (finalTranscript) {
        onResult({ final: finalTranscript, interim: '', isFinal: true });
      }
    };

    recognition.start();
    return recognition;
  } catch (error) {
    onError(error.message);
    return null;
  }
};

// Common agricultural queries in different languages
export const commonQueries = {
  'hi-IN': [
    'मेरे खेत में कौन सी फसल उगानी चाहिए?',
    'गेहूं को कब पानी देना चाहिए?',
    'मेरी फसल में कीड़े लग गए हैं, क्या करूं?',
    'आज का मौसम कैसा रहेगा?',
    'खाद कितनी डालनी चाहिए?'
  ],
  'en-IN': [
    'Which crop should I grow in my field?',
    'When should I water my wheat?',
    'My crops have pest infestation, what should I do?',
    'What is the weather forecast for today?',
    'How much fertilizer should I use?'
  ],
  'pa-IN': [
    'ਮੇਰੇ ਖੇਤ ਵਿੱਚ ਕਿਹੜੀ ਫਸਲ ਉਗਾਉਣੀ ਚਾਹੀਦੀ ਹੈ?',
    'ਕਣਕ ਨੂੰ ਕਦੋਂ ਪਾਣੀ ਦੇਣਾ ਚਾਹੀਦਾ ਹੈ?',
    'ਅੱਜ ਦਾ ਮੌਸਮ ਕਿਵੇਂ ਰਹੇਗਾ?'
  ]
};

// Get greeting based on time and language
export const getGreeting = (language = 'hi-IN') => {
  const hour = new Date().getHours();
  const greetings = {
    'hi-IN': {
      morning: 'नमस्ते! सुप्रभात। मैं आपकी कृषि सहायक हूं।',
      afternoon: 'नमस्ते! मैं आपकी कृषि सहायक हूं।',
      evening: 'नमस्ते! शुभ संध्या। मैं आपकी कृषि सहायक हूं।'
    },
    'en-IN': {
      morning: 'Good morning! I am your farming assistant.',
      afternoon: 'Good afternoon! I am your farming assistant.',
      evening: 'Good evening! I am your farming assistant.'
    },
    'pa-IN': {
      morning: 'ਸਤ ਸ੍ਰੀ ਅਕਾਲ! ਮੈਂ ਤੁਹਾਡਾ ਖੇਤੀ ਸਹਾਇਕ ਹਾਂ।',
      afternoon: 'ਸਤ ਸ੍ਰੀ ਅਕਾਲ! ਮੈਂ ਤੁਹਾਡਾ ਖੇਤੀ ਸਹਾਇਕ ਹਾਂ।',
      evening: 'ਸਤ ਸ੍ਰੀ ਅਕਾਲ! ਮੈਂ ਤੁਹਾਡਾ ਖੇਤੀ ਸਹਾਇਕ ਹਾਂ।'
    }
  };

  const defaultGreetings = greetings['en-IN'];
  const langGreetings = greetings[language] || defaultGreetings;

  if (hour < 12) return langGreetings.morning;
  if (hour < 17) return langGreetings.afternoon;
  return langGreetings.evening;
};