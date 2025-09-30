import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isLoading, setIsLoading] = useState(true);

  // Language configurations
  const languages = {
    en: {
      code: 'en',
      name: 'English',
      nativeName: 'English',
      flag: '🇬🇧',
      direction: 'ltr'
    },
    hi: {
      code: 'hi',
      name: 'Hindi',
      nativeName: 'हिन्दी',
      flag: '🇮🇳',
      direction: 'ltr'
    },
    ta: {
      code: 'ta',
      name: 'Tamil',
      nativeName: 'தமிழ்',
      flag: '🇮🇳',
      direction: 'ltr'
    },
    te: {
      code: 'te',
      name: 'Telugu',
      nativeName: 'తెలుగు',
      flag: '🇮🇳',
      direction: 'ltr'
    },
    kn: {
      code: 'kn',
      name: 'Kannada',
      nativeName: 'ಕನ್ನಡ',
      flag: '🇮🇳',
      direction: 'ltr'
    },
    gu: {
      code: 'gu',
      name: 'Gujarati',
      nativeName: 'ગુજરાતી',
      flag: '🇮🇳',
      direction: 'ltr'
    },
    mr: {
      code: 'mr',
      name: 'Marathi',
      nativeName: 'मराठी',
      flag: '🇮🇳',
      direction: 'ltr'
    },
    pa: {
      code: 'pa',
      name: 'Punjabi',
      nativeName: 'ਪੰਜਾਬੀ',
      flag: '🇮🇳',
      direction: 'ltr'
    },
    bn: {
      code: 'bn',
      name: 'Bengali',
      nativeName: 'বাংলা',
      flag: '🇮🇳',
      direction: 'ltr'
    },
    or: {
      code: 'or',
      name: 'Odia',
      nativeName: 'ଓଡ଼ିଆ',
      flag: '🇮🇳',
      direction: 'ltr'
    }
  };

  // Basic translations
  const translations = {
    en: {
      // Navigation
      farmAnalysis: 'Farm Analysis',
      chatbot: 'AI Assistant',
      marketplace: 'Marketplace',
      weather: 'Weather',
      profile: 'Profile',
      
      // Common
      loading: 'Loading...',
      error: 'Error occurred',
      success: 'Success',
      cancel: 'Cancel',
      save: 'Save',
      delete: 'Delete',
      edit: 'Edit',
      search: 'Search',
      filter: 'Filter',
      
      // Farm Analysis
      selectLocation: 'Select your farm location on the map',
      farmArea: 'Farm Area (acres)',
      analyzeFarm: 'Analyze My Farm',
      analysisReport: 'Analysis Report',
      
      // Chatbot
      askQuestion: 'Ask me anything about farming...',
      popularQuestions: 'Popular Questions',
      
      // Marketplace  
      products: 'Products',
      categories: 'Categories',
      priceRange: 'Price Range',
      location: 'Location',
      seller: 'Seller'
    },
    hi: {
      // Navigation
      farmAnalysis: 'फार्म विश्लेषण',
      chatbot: 'AI सहायक',
      marketplace: 'बाज़ार',
      weather: 'मौसम',
      profile: 'प्रोफाइल',
      
      // Common
      loading: 'लोड हो रहा है...',
      error: 'त्रुटि हुई',
      success: 'सफलता',
      cancel: 'रद्द करें',
      save: 'सेव करें',
      delete: 'मिटाएं',
      edit: 'संपादित करें',
      search: 'खोजें',
      filter: 'फिल्टर',
      
      // Farm Analysis
      selectLocation: 'मानचित्र पर अपने खेत का स्थान चुनें',
      farmArea: 'खेत का क्षेत्र (एकड़)',
      analyzeFarm: 'मेरे खेत का विश्लेषण करें',
      analysisReport: 'विश्लेषण रिपोर्ट',
      
      // Chatbot
      askQuestion: 'खेती के बारे में कुछ भी पूछें...',
      popularQuestions: 'लोकप्रिय प्रश्न',
      
      // Marketplace
      products: 'उत्पाद',
      categories: 'श्रेणियां',
      priceRange: 'मूल्य सीमा',
      location: 'स्थान',
      seller: 'विक्रेता'
    }
    // Add more languages as needed
  };

  useEffect(() => {
    // Load saved language preference
    const savedLanguage = localStorage.getItem('preferred_language');
    if (savedLanguage && languages[savedLanguage]) {
      setCurrentLanguage(savedLanguage);
    } else {
      // Detect browser language
      const browserLang = navigator.language.split('-')[0];
      if (languages[browserLang]) {
        setCurrentLanguage(browserLang);
      }
    }
    setIsLoading(false);
  }, []);

  const changeLanguage = (languageCode) => {
    if (languages[languageCode]) {
      setCurrentLanguage(languageCode);
      localStorage.setItem('preferred_language', languageCode);
      
      // Update document direction if needed
      document.documentElement.dir = languages[languageCode].direction;
      
      // Update document lang attribute
      document.documentElement.lang = languageCode;
    }
  };

  const translate = (key, fallback = key) => {
    const currentTranslations = translations[currentLanguage] || translations.en;
    return currentTranslations[key] || fallback;
  };

  const getCurrentLanguageInfo = () => {
    return languages[currentLanguage] || languages.en;
  };

  const value = {
    currentLanguage,
    languages,
    translations: translations[currentLanguage] || translations.en,
    isLoading,
    changeLanguage,
    translate,
    getCurrentLanguageInfo,
    isSupported: (langCode) => !!languages[langCode]
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};