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
    },
    ta: {
      // Navigation
      farmAnalysis: 'பண்ணை பகுப்பாய்வு',
      chatbot: 'AI உதவியாளர்',
      marketplace: 'சந்தை',
      weather: 'வானிலை',
      profile: 'சுயவிவரம்',
      
      // Common
      loading: 'ஏற்றுகிறது...',
      error: 'பிழை ஏற்பட்டது',
      success: 'வெற்றி',
      cancel: 'ரத்து செய்',
      save: 'சேமி',
      delete: 'நீக்கு',
      edit: 'திருத்து',
      search: 'தேடு',
      filter: 'வடிகட்டி',
      
      // Farm Analysis
      selectLocation: 'வரைபடத்தில் உங்கள் பண்ணையின் இடத்தைத் தேர்ந்தெடுக்கவும்',
      farmArea: 'பண்ணை பகுதி (ஏக்கர்)',
      analyzeFarm: 'என் பண்ணையை பகுப்பாய்வு செய்',
      analysisReport: 'பகுப்பாய்வு அறிக்கை',
      
      // Chatbot
      askQuestion: 'விவசாயம் பற்றி எதையும் கேளுங்கள்...',
      popularQuestions: 'பிரபலமான கேள்விகள்',
      
      // Marketplace
      products: 'பொருட்கள்',
      categories: 'வகைகள்',
      priceRange: 'விலை வரம்பு',
      location: 'இடம்',
      seller: 'விற்பனையாளர்'
    },
    te: {
      // Navigation
      farmAnalysis: 'వ్యవసాయ విశ్లేషణ',
      chatbot: 'AI సహాయకుడు',
      marketplace: 'మార్కెట్‌ప్లేస్',
      weather: 'వాతావరణం',
      profile: 'ప్రొఫైల్',
      
      // Common
      loading: 'లోడ్ అవుతోంది...',
      error: 'లోపం సంభవించింది',
      success: 'విజయం',
      cancel: 'రద్దు చేయి',
      save: 'సేవ్ చేయి',
      delete: 'తొలగించు',
      edit: 'సవరించు',
      search: 'వెతకు',
      filter: 'ఫిల్టర్',
      
      // Farm Analysis
      selectLocation: 'మ్యాప్‌లో మీ పొలం ప్రాంతాన్ని ఎంచుకోండి',
      farmArea: 'పొలం వైశాల్యం (ఎకరాలు)',
      analyzeFarm: 'నా పొలాన్ని విశ్లేషించు',
      analysisReport: 'విశ్లేషణ నివేదిక',
      
      // Chatbot
      askQuestion: 'వ్యవసాయం గురించి ఏదైనా అడగండి...',
      popularQuestions: 'ప్రసిద్ధ ప్రశ్నలు',
      
      // Marketplace
      products: 'ఉత్పత్తులు',
      categories: 'వర్గాలు',
      priceRange: 'ధర పరిధి',
      location: 'స్థానం',
      seller: 'అమ్మకందారు'
    },
    kn: {
      // Navigation
      farmAnalysis: 'ಕೃಷಿ ವಿಶ್ಲೇಷಣೆ',
      chatbot: 'AI ಸಹಾಯಕ',
      marketplace: 'ಮಾರುಕಟ್ಟೆ',
      weather: 'ಹವಾಮಾನ',
      profile: 'ಪ್ರೊಫೈಲ್',
      
      // Common
      loading: 'ಲೋಡ್ ಆಗುತ್ತಿದೆ...',
      error: 'ದೋಷ ಸಂಭವಿಸಿದೆ',
      success: 'ಯಶಸ್ಸು',
      cancel: 'ರದ್ದುಮಾಡು',
      save: 'ಉಳಿಸು',
      delete: 'ಅಳಿಸು',
      edit: 'ಸಂಪಾದಿಸು',
      search: 'ಹುಡುಕು',
      filter: 'ಫಿಲ್ಟರ್',
      
      // Farm Analysis
      selectLocation: 'ನಕ್ಷೆಯಲ್ಲಿ ನಿಮ್ಮ ಕೃಷಿ ಸ್ಥಳವನ್ನು ಆಯ್ಕೆಮಾಡಿ',
      farmArea: 'ಕೃಷಿ ಪ್ರದೇಶ (ಎಕರೆ)',
      analyzeFarm: 'ನನ್ನ ಕೃಷಿಯನ್ನು ವಿಶ್ಲೇಷಿಸು',
      analysisReport: 'ವಿಶ್ಲೇಷಣೆ ವರದಿ',
      
      // Chatbot
      askQuestion: 'ಕೃಷಿಯ ಬಗ್ಗೆ ಏನನ್ನೂ ಕೇಳಿ...',
      popularQuestions: 'ಜನಪ್ರಿಯ ಪ್ರಶ್ನೆಗಳು',
      
      // Marketplace
      products: 'ಉತ್ಪನ್ನಗಳು',
      categories: 'ವರ್ಗಗಳು',
      priceRange: 'ಬೆಲೆ ವ್ yaಕ್ತಿ',
      location: 'ಸ್ಥಳ',
      seller: 'ಮಾರಾಟಗಾರ'
    },
    gu: {
      // Navigation
      farmAnalysis: 'ખેતી વિશ્લેષણ',
      chatbot: 'AI સહાયક',
      marketplace: 'બજાર',
      weather: 'હવામાન',
      profile: 'પ્રોફાઇલ',
      
      // Common
      loading: 'લોડ થઈ રહ્યું છે...',
      error: 'ભૂલ આવી',
      success: 'સફળતા',
      cancel: 'રદ કરો',
      save: 'સેવ કરો',
      delete: 'ડિલીટ કરો',
      edit: 'એડિટ કરો',
      search: 'સર્ચ કરો',
      filter: 'ફિલ્ટર',
      
      // Farm Analysis
      selectLocation: 'નકશા પર તમારી ખેતીનું સ્થાન પસંદ કરો',
      farmArea: 'ખેત વિસ્તાર (એકર)',
      analyzeFarm: 'મારી ખેતીનું વિશ્લેષણ કરો',
      analysisReport: 'વિશ્લેષણ અહેવાલ',
      
      // Chatbot
      askQuestion: 'ખેતી વિશે કંઈપણ પૂછો...',
      popularQuestions: 'લોકપ્રિય પ્રશ્નો',
      
      // Marketplace
      products: 'પ્રોડક્ટ્સ',
      categories: 'કેટેગરીઝ',
      priceRange: 'કિંમત રેન્જ',
      location: 'સ્થાન',
      seller: 'વેચનાર'
    },
    mr: {
      // Navigation
      farmAnalysis: 'शेती विश्लेषण',
      chatbot: 'AI सहाय्यक',
      marketplace: 'बाजारपेठ',
      weather: 'हवामान',
      profile: 'प्रोफाइल',
      
      // Common
      loading: 'लोड होत आहे...',
      error: 'त्रुटी झाली',
      success: 'यश',
      cancel: 'रद्द करा',
      save: 'जतन करा',
      delete: 'हटवा',
      edit: 'संपादित करा',
      search: 'शोधा',
      filter: 'फिल्टर',
      
      // Farm Analysis
      selectLocation: 'नकाशावर तुमच्या शेताचे स्थान निवडा',
      farmArea: 'शेत क्षेत्र (एकर)',
      analyzeFarm: 'माझ्या शेताचे विश्लेषण करा',
      analysisReport: 'विश्लेषण अहवाल',
      
      // Chatbot
      askQuestion: 'शेतीबद्दल काहीही विचारा...',
      popularQuestions: 'लोकप्रिय प्रश्न',
      
      // Marketplace
      products: 'उत्पादने',
      categories: 'श्रेणी',
      priceRange: 'किंमत श्रेणी',
      location: 'स्थान',
      seller: 'विक्रेता'
    },
    pa: {
      // Navigation
      farmAnalysis: 'ਖੇਤੀ ਵਿਸ਼ਲੇਸ਼ਣ',
      chatbot: 'AI ਸਹਾਇਕ',
      marketplace: 'ਬਾਜ਼ਾਰ',
      weather: 'ਮੌਸਮ',
      profile: 'ਪ੍ਰੋਫਾਈਲ',
      
      // Common
      loading: 'ਲੋਡ ਹੋ ਰਿਹਾ ਹੈ...',
      error: 'ਗਲਤੀ ਹੋਈ',
      success: 'ਸਫਲਤਾ',
      cancel: 'ਰੱਦ ਕਰੋ',
      save: 'ਸੇਵ ਕਰੋ',
      delete: 'ਮਿਟਾਓ',
      edit: 'ਸੰਪਾਦਿਤ ਕਰੋ',
      search: 'ਖੋਜੋ',
      filter: 'ਫਿਲਟਰ',
      
      // Farm Analysis
      selectLocation: 'ਨਕਸ਼ੇ ਤੇ ਆਪਣੇ ਖੇਤ ਦੀ ਸਥਿਤੀ ਚੁਣੋ',
      farmArea: 'ਖੇਤ ਖੇਤਰ (ਏਕੜ)',
      analyzeFarm: 'ਮੇਰੇ ਖੇਤ ਦਾ ਵਿਸ਼ਲੇਸ਼ਣ ਕਰੋ',
      analysisReport: 'ਵਿਸ਼ਲੇਸ਼ਣ ਰਿਪੋਰਟ',
      
      // Chatbot
      askQuestion: 'ਖੇਤੀ ਬਾਰੇ ਕੁਝ ਵੀ ਪੁੱਛੋ...',
      popularQuestions: 'ਪ੍ਰਸਿੱਧ ਸਵਾਲ',
      
      // Marketplace
      products: 'ਉਤਪਾਦ',
      categories: 'ਸ਼੍ਰੇਣੀਆਂ',
      priceRange: 'ਕੀਮਤ ਰੇਂਜ',
      location: 'ਸਥਾਨ',
      seller: 'ਵਿਕਰੇਤਾ'
    },
    bn: {
      // Navigation
      farmAnalysis: 'কৃষি বিশ্লেষণ',
      chatbot: 'AI সহায়ক',
      marketplace: 'বাজার',
      weather: 'আবহাওয়া',
      profile: 'প্রোফাইল',
      
      // Common
      loading: 'লোড হচ্ছে...',
      error: 'ত্রুটি হয়েছে',
      success: 'সফলতা',
      cancel: 'বাতিল করুন',
      save: 'সেভ করুন',
      delete: 'মুছুন',
      edit: 'সম্পাদনা করুন',
      search: 'খুঁজুন',
      filter: 'ফিল্টার',
      
      // Farm Analysis
      selectLocation: 'মানচিত্রে আপনার খামারের অবস্থান নির্বাচন করুন',
      farmArea: 'খামার এলাকা (একর)',
      analyzeFarm: 'আমার খামার বিশ্লেষণ করুন',
      analysisReport: 'বিশ্লেষণ রিপোর্ট',
      
      // Chatbot
      askQuestion: 'কৃষি সম্পর্কে যেকোনো কিছু জিজ্ঞাসা করুন...',
      popularQuestions: 'জনপ্রিয় প্রশ্ন',
      
      // Marketplace
      products: 'পণ্য',
      categories: 'ক্যাটেগরি',
      priceRange: 'দামের পরিসীমা',
      location: 'অবস্থান',
      seller: 'বিক্রেতা'
    },
    or: {
      // Navigation
      farmAnalysis: 'କୃଷି ବିଶ୍ଳେଷଣ',
      chatbot: 'AI ସହାୟକ',
      marketplace: 'ବଜାର',
      weather: 'ପାଗ',
      profile: 'ପ୍ରୋଫାଇଲ୍',
      
      // Common
      loading: 'ଲୋଡ୍ ହେଉଛି...',
      error: 'ତ୍ରୁଟି ଘଟିଛି',
      success: 'ସଫଳତା',
      cancel: 'ବାତିଲ୍ କରନ୍ତୁ',
      save: 'ସେଭ୍ କରନ୍ତୁ',
      delete: 'ଡିଲିଟ୍ କରନ୍ତୁ',
      edit: 'ଏଡିଟ୍ କରନ୍ତୁ',
      search: 'ଖୋଜନ୍ତୁ',
      filter: 'ଫିଲ୍ଟର୍',
      
      // Farm Analysis
      selectLocation: 'ମାନଚିତ୍ରରେ ଆପଣଙ୍କ ଖେତର ଅବସ୍ଥାନ ବାଛନ୍ତୁ',
      farmArea: 'ଖେତ କ୍ଷେତ୍ର (ଏକର)',
      analyzeFarm: 'ମୋ ଖେତର ବିଶ୍ଳେଷଣ କରନ୍ତୁ',
      analysisReport: 'ବିଶ୍ଳେଷଣ ରିପୋର୍ଟ',
      
      // Chatbot
      askQuestion: 'କୃଷି ବିଷୟରେ ଯେକୌଣସି ପ୍ରଶ୍ନ ପଚାରନ୍ତୁ...',
      popularQuestions: 'ଲୋକପ୍ରିୟ ପ୍ରଶ୍ନ',
      
      // Marketplace
      products: 'ଦ୍ରବ୍ୟ',
      categories: 'ଶ୍ରେଣୀ',
      priceRange: 'ମୂଲ୍ୟ ପରିସର',
      location: 'ଅବସ୍ଥାନ',
      seller: 'ବିକ୍ରେତା'
    }
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