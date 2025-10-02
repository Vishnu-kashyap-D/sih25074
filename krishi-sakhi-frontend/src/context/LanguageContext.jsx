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

  // Comprehensive translations
  const translations = {
    en: {
      // Navigation
      farmAnalysis: 'Farm Analysis',
      cropAnalysis: 'Crop Analysis',
      chatbot: 'AI Assistant',
      marketplace: 'Marketplace',
      weather: 'Weather',
      profile: 'Profile',
      home: 'Home',
      community: 'Community',
      
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
      submit: 'Submit',
      back: 'Back',
      next: 'Next',
      previous: 'Previous',
      close: 'Close',
      
      // Home Page
      welcomeTitle: 'Welcome to Krishi Sakhi',
      welcomeSubtitle: 'Your AI-powered farming companion for better yields and sustainable agriculture',
      getStarted: 'Get Started',
      learnMore: 'Learn More',
      
      // Features
      featuresTitle: 'Powerful Features for Modern Farmers',
      smartAnalysis: 'Smart Farm Analysis',
      smartAnalysisDesc: 'AI-powered analysis of your farm conditions, soil health, and crop recommendations',
      cropMonitoring: 'Crop Health Monitoring',
      cropMonitoringDesc: 'Real-time monitoring and disease detection using advanced image recognition',
      weatherInsights: 'Weather Insights',
      weatherInsightsDesc: 'Accurate weather forecasts and agricultural advisories for your region',
      marketplaceAccess: 'Marketplace Access',
      marketplaceAccessDesc: 'Connect with buyers and sellers for seeds, equipment, and produce',
      aiAssistant: 'AI Assistant',
      aiAssistantDesc: '24/7 AI-powered farming advice and guidance in your local language',
      communitySupport: 'Community Support',
      communitySupportDesc: 'Connect with fellow farmers and experts for knowledge sharing',
      
      // Farm Analysis
      selectLocation: 'Select your farm location on the map',
      farmArea: 'Farm Area (acres)',
      analyzeFarm: 'Analyze My Farm',
      analysisReport: 'Analysis Report',
      soilHealth: 'Soil Health',
      cropRecommendations: 'Crop Recommendations',
      
      // Crop Analysis
      uploadImage: 'Upload Crop Image',
      dragDropImage: 'Drag and drop your image here, or click to select',
      analyzeImage: 'Analyze Image',
      cropHealth: 'Crop Health',
      diseaseDetection: 'Disease Detection',
      healthScore: 'Health Score',
      recommendations: 'Recommendations',
      
      // Weather
      currentWeather: 'Current Weather',
      forecast: 'Forecast',
      temperature: 'Temperature',
      humidity: 'Humidity',
      windSpeed: 'Wind Speed',
      rainfall: 'Rainfall',
      
      // Chatbot
      askQuestion: 'Ask me anything about farming...',
      popularQuestions: 'Popular Questions',
      voiceAssistant: 'Voice Assistant',
      textChat: 'Text Chat',
      startListening: 'Start Listening',
      stopListening: 'Stop Listening',
      
      // Marketplace  
      products: 'Products',
      categories: 'Categories',
      priceRange: 'Price Range',
      location: 'Location',
      seller: 'Seller',
      buyNow: 'Buy Now',
      addToCart: 'Add to Cart',
      
      // Community
      communityForum: 'Community Forum',
      askCommunity: 'Ask Community',
      shareExperience: 'Share Experience',
      expertAdvice: 'Expert Advice',
      
      // Profile
      myProfile: 'My Profile',
      settings: 'Settings',
      language: 'Language',
      notifications: 'Notifications',
      logout: 'Logout',
      
      // Additional HomePage content
      login: 'Login',
      signUp: 'Sign Up',
      accessDashboard: 'Access Dashboard',
      featuresSubtitle: 'Comprehensive tools and insights to modernize your farming practices',
      explore: 'Explore',
      ctaTitle: 'Ready to Transform Your Farming?',
      ctaSubtitle: 'Join thousands of farmers who are already using Krishi Sakhi to improve their yields and income',
      startAnalysis: 'Start Analysis Now',
      loginToStart: 'Login to Start',
      
      // Header content
      platformTagline: 'Smart Farm Analysis Platform',
      signedInAs: 'Signed in as',
      menu: 'Menu',
      
      // Weather specific
      temperatureTrend: 'Temperature Trend',
      rainProbability: 'Rain Probability',
      high: 'High',
      low: 'Low'
    },
    hi: {
      // Navigation
      farmAnalysis: 'फार्म विश्लेषण',
      cropAnalysis: 'फसल विश्लेषण',
      chatbot: 'AI सहायक',
      marketplace: 'बाज़ार',
      weather: 'मौसम',
      profile: 'प्रोफाइल',
      home: 'होम',
      community: 'समुदाय',
      
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
      submit: 'जमा करें',
      back: 'वापस',
      next: 'आगे',
      previous: 'पिछला',
      close: 'बंद करें',
      
      // Home Page
      welcomeTitle: 'कृषि सखी में आपका स्वागत है',
      welcomeSubtitle: 'बेहतर उत्पादन और टिकाऊ कृषि के लिए आपका AI-संचालित कृषि साथी',
      getStarted: 'शुरू करें',
      learnMore: 'और जानें',
      
      // Features
      featuresTitle: 'आधुनिक किसानों के लिए शक्तिशाली फीचर्स',
      smartAnalysis: 'स्मार्ट फार्म विश्लेषण',
      smartAnalysisDesc: 'आपकी खेत की स्थिति, मिट्टी की सेहत और फसल की सिफारिशों का AI-संचालित विश्लेषण',
      cropMonitoring: 'फसल स्वास्थ्य निगरानी',
      cropMonitoringDesc: 'उन्नत इमेज पहचान का उपयोग करके रीयल-टाइम निगरानी और रोग का पता लगाना',
      weatherInsights: 'मौसम की जानकारी',
      weatherInsightsDesc: 'आपके क्षेत्र के लिए सटीक मौसम पूर्वानुमान और कृषि सलाह',
      marketplaceAccess: 'बाज़ार पहुंच',
      marketplaceAccessDesc: 'बीज, उपकरण और उत्पादों के लिए खरीदारों और विक्रेताओं से जुड़ें',
      aiAssistant: 'AI सहायक',
      aiAssistantDesc: '24/7 AI-संचालित खेती की सलाह और आपकी स्थानीय भाषा में मार्गदर्शन',
      communitySupport: 'समुदायिक सहायता',
      communitySupportDesc: 'ज्ञान साझाकरण के लिए साथी किसानों और विशेषज्ञों से जुड़ें',
      
      // Farm Analysis
      selectLocation: 'मानचित्र पर अपने खेत का स्थान चुनें',
      farmArea: 'खेत का क्षेत्र (एकड़)',
      analyzeFarm: 'मेरे खेत का विश्लेषण करें',
      analysisReport: 'विश्लेषण रिपोर्ट',
      soilHealth: 'मिट्टी की सेहत',
      cropRecommendations: 'फसल की सिफारिशें',
      
      // Crop Analysis
      uploadImage: 'फसल की तस्वीर अपलोड करें',
      dragDropImage: 'अपनी तस्वीर यहाँ खींचें और छोड़ें, या चुनने के लिए क्लिक करें',
      analyzeImage: 'तस्वीर का विश्लेषण करें',
      cropHealth: 'फसल स्वास्थ्य',
      diseaseDetection: 'रोग का पता लगाना',
      healthScore: 'स्वास्थ्य स्कोर',
      recommendations: 'सिफारिशें',
      
      // Weather
      currentWeather: 'वर्तमान मौसम',
      forecast: 'पूर्वानुमान',
      temperature: 'तापमान',
      humidity: 'आर्द्रता',
      windSpeed: 'हवा की गति',
      rainfall: 'वर्षा',
      
      // Chatbot
      askQuestion: 'खेती के बारे में कुछ भी पूछें...',
      popularQuestions: 'लोकप्रिय प्रश्न',
      voiceAssistant: 'आवाज सहायक',
      textChat: 'टेक्स्ट चैट',
      startListening: 'सुनना शुरू करें',
      stopListening: 'सुनना बंद करें',
      
      // Marketplace
      products: 'उत्पाद',
      categories: 'श्रेणियां',
      priceRange: 'मूल्य सीमा',
      location: 'स्थान',
      seller: 'विक्रेता',
      buyNow: 'अभी खरीदें',
      addToCart: 'कार्ट में जोड़ें',
      
      // Community
      communityForum: 'समुदायिक फोरम',
      askCommunity: 'समुदाय से पूछें',
      shareExperience: 'अनुभव साझा करें',
      expertAdvice: 'विशेषज्ञ सलाह',
      
      // Profile
      myProfile: 'मेरा प्रोफाइल',
      settings: 'सेटिंग्स',
      language: 'भाषा',
      notifications: 'सूचनाएं',
      logout: 'लॉगआउट',
      
      // Additional HomePage content
      login: 'लॉगिन',
      signUp: 'साइन अप',
      accessDashboard: 'डैशबोर्ड एक्सेस करें',
      featuresSubtitle: 'आपकी खेती की पद्धतियों को आधुनिक बनाने के लिए व्यापक उपकरण और अंतर्दृष्टि',
      explore: 'खोजें',
      ctaTitle: 'अपनी खेती को बदलने के लिए तैयार हैं?',
      ctaSubtitle: 'हजारों किसानों के साथ जुड़ें जो पहले से ही कृषि सखी का उपयोग करके अपनी पैदावार और आय में सुधार कर रहे हैं',
      startAnalysis: 'अब विश्लेषण शुरू करें',
      loginToStart: 'शुरू करने के लिए लॉगिन करें',
      
      // Header content
      platformTagline: 'स्मार्ट फार्म विश्लेषण प्लेटफार्म',
      signedInAs: 'इस रूप में साइन इन',
      menu: 'मेनू',
      
      // Weather specific
      temperatureTrend: 'तापमान प्रवृत्ति',
      rainProbability: 'वर्षा की संभावना',
      high: 'उच्च',
      low: 'निम्न'
    },
    ta: {
      // Navigation
      farmAnalysis: 'பண்ணை பகுப்பாய்வு',
      cropAnalysis: 'பயிர் பகுப்பாய்வு',
      chatbot: 'AI உதவியாளர்',
      marketplace: 'சந்தை',
      weather: 'வானிலை',
      profile: 'சுயவிவரம்',
      home: 'முகப்பு',
      community: 'சமூகம்',
      
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
      submit: 'சமர்ப்பி',
      back: 'பின்னால்',
      next: 'அடுத்தது',
      previous: 'முந்தையது',
      close: 'மூடு',
      
      // Home Page
      welcomeTitle: 'கிருஷி சகியில் உங்களை வரவேற்கிறோம்',
      welcomeSubtitle: 'சிறந்த விளைச்சல் மற்றும் நிலையான விவசாயத்திற்கான உங்கள் AI-இயங்கும் விவசாய துணைவன்',
      getStarted: 'தொடங்குங்கள்',
      learnMore: 'மேலும் அறிக',
      
      // Features
      featuresTitle: 'நவீன விவசாயிகளுக்கான சக்திவாய்ந்த அம்சங்கள்',
      smartAnalysis: 'ஸ்மார்ட் பண்ணை பகுப்பாய்வு',
      smartAnalysisDesc: 'உங்கள் பண்ணை நிலைமைகள், மண் ஆரோக்கியம் மற்றும் பயிர் பரிந்துரைகளின் AI-இயங்கும் பகுப்பாய்வு',
      cropMonitoring: 'பயிர் ஆரோக்கிய கண்காணிப்பு',
      cropMonitoringDesc: 'மேம்பட்ட பட அங்கீகாரத்தைப் பயன்படுத்தி நிகழ்நேர கண்காணிப்பு மற்றும் நோய் கண்டறிதல்',
      weatherInsights: 'வானிலை நுண்ணறிவு',
      weatherInsightsDesc: 'உங்கள் பகுதிக்கான துல்லியமான வானிலை முன்னறிவிப்புகள் மற்றும் விவசாய ஆலோசனைகள்',
      marketplaceAccess: 'சந்தை அணுகல்',
      marketplaceAccessDesc: 'விதைகள், உபகரணங்கள் மற்றும் விளைபொருட்களுக்கான வாங்குபவர்கள் மற்றும் விற்பனையாளர்களுடன் இணைக்கவும்',
      aiAssistant: 'AI உதவியாளர்',
      aiAssistantDesc: '24/7 AI-இயங்கும் விவசாய ஆலோசனை மற்றும் உங்கள் உள்ளூர் மொழியில் வழிகாட்டுதல்',
      communitySupport: 'சமூக ஆதரவு',
      communitySupportDesc: 'அறிவு பகிர்வுக்காக சக விவசாயிகள் மற்றும் நிபுணர்களுடன் இணைக்கவும்',
      
      // Farm Analysis
      selectLocation: 'வரைபடத்தில் உங்கள் பண்ணையின் இடத்தைத் தேர்ந்தெடுக்கவும்',
      farmArea: 'பண்ணை பகுதி (ஏக்கர்)',
      analyzeFarm: 'என் பண்ணையை பகுப்பாய்வு செய்',
      analysisReport: 'பகுப்பாய்வு அறிக்கை',
      soilHealth: 'மண் ஆரோக்கியம்',
      cropRecommendations: 'பயிர் பரிந்துரைகள்',
      
      // Crop Analysis
      uploadImage: 'பயிர் படத்தை பதிவேற்றுக',
      dragDropImage: 'உங்கள் படத்தை இங்கே இழுத்து விடுக, அல்லது தேர்வு செய்ய கிளிக் செய்யவும்',
      analyzeImage: 'படத்தை பகுப்பாய்வு செய்',
      cropHealth: 'பயிர் ஆரோக்கியம்',
      diseaseDetection: 'நோய் கண்டறிதல்',
      healthScore: 'ஆரோக்கிய மதிப்பெண்',
      recommendations: 'பரிந்துரைகள்',
      
      // Weather
      currentWeather: 'தற்போதைய வானிலை',
      forecast: 'முன்னறிவிப்பு',
      temperature: 'வெப்பநிலை',
      humidity: 'ஈரப்பதம்',
      windSpeed: 'காற்று வேகம்',
      rainfall: 'மழைப்பொழிவு',
      
      // Chatbot
      askQuestion: 'விவசாயம் பற்றி எதையும் கேளுங்கள்...',
      popularQuestions: 'பிரபலமான கேள்விகள்',
      voiceAssistant: 'குரல் உதவியாளர்',
      textChat: 'உரை அரட்டை',
      startListening: 'கேட்க தொடங்கு',
      stopListening: 'கேட்பதை நிறுத்து',
      
      // Marketplace
      products: 'பொருட்கள்',
      categories: 'வகைகள்',
      priceRange: 'விலை வரம்பு',
      location: 'இடம்',
      seller: 'விற்பனையாளர்',
      buyNow: 'இப்போது வாங்கு',
      addToCart: 'கார்ட்டில் சேர்க்கவும்',
      
      // Community
      communityForum: 'சமூக மன்றம்',
      askCommunity: 'சமூகத்திடம் கேளுங்கள்',
      shareExperience: 'அனுபவத்தைப் பகிர்ந்து கொள்ளுங்கள்',
      expertAdvice: 'நிபுணர் ஆலோசனை',
      
      // Profile
      myProfile: 'என் சுயவிவரம்',
      settings: 'அமைப்புகள்',
      language: 'மொழி',
      notifications: 'அறிவிப்புகள்',
      logout: 'வெளியேறு',
      
      // Additional HomePage content
      login: 'லாகின்',
      signUp: 'கணக்கின் தொடங்கி',
      accessDashboard: 'டாஷ்போர்ட் அணுகல்',
      featuresSubtitle: 'உங்கள் விவசாய அளவீட்டை நவீனமாக்க விரிவான கருவிகள் மற்றும் கார்னைத் திறன்கள்',
      explore: 'அறிக',
      ctaTitle: 'உங்கள் விவசாயத்தை மாற்ற தயாரா?',
      ctaSubtitle: 'க௃ஷி சகியின் பயன்பாட்டை ஏற்கனவே செய்து தங்கள் விளைச்சல் மற்றும் வருமானத்தை மேம்படுத்திவரும் ஆயிரக்கணக்கான விவசாயிகளுடன் சேரவும்',
      startAnalysis: 'இப்போது பகுப்பாய்வு தொடங்கு',
      loginToStart: 'தொடங்க லாகின் செய்',
      
      // Header content
      platformTagline: 'ஸ்மார்ட் பண்ணை பகுப்பாய்வு மன்சம்',
      signedInAs: 'இதுகாக உள்ளே கிறீர்',
      menu: 'மெனு',
      
      // Weather specific
      temperatureTrend: 'வெப்பநிலை ப்ரவ௃த்தி',
      rainProbability: 'மழை சாத்தியத்தை',
      high: 'அதிகம்',
      low: 'குறைவு'
    },
    te: {
      // Navigation
      farmAnalysis: 'వ్యవసాయ విశ్లేషణ',
      cropAnalysis: 'పంట విశ్లేషణ',
      chatbot: 'AI సహాయకుడు',
      marketplace: 'మార్కెట్‌ప్లేస్',
      weather: 'వాతావరణం',
      profile: 'ప్రొఫైల్',
      home: 'హోమ్',
      community: 'కమ్యూనిటీ',
      
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
      submit: 'సమర్పించు',
      back: 'వెనుకకు',
      next: 'తదుపరి',
      previous: 'మునుపటి',
      close: 'మూసివేయు',
      
      // Home Page
      welcomeTitle: 'కృషి సఖిలో మీకు స్వాగతం',
      welcomeSubtitle: 'మెరుగైన దిగుబడి మరియు స్థిరమైన వ్యవసాయం కోసం మీ AI-నడిచే వ్యవసాయ సహాయకుడు',
      getStarted: 'ప్రారంభించండి',
      learnMore: 'మరింత తెలుసుకోండి',
      
      // Features
      featuresTitle: 'ఆధునిక రైతులకు శక్తివంతమైన లక్షణాలు',
      smartAnalysis: 'స్మార్ట్ పొలం విశ్లేషణ',
      smartAnalysisDesc: 'మీ పొలం పరిస్థితులు, మట్టి ఆరోగ్యం మరియు పంట సిఫార్సుల AI-నడిచే విశ్లేషణ',
      cropMonitoring: 'పంట ఆరోగ్య పర్యవేక్షణ',
      cropMonitoringDesc: 'అధునాతన చిత్ర గుర్తింపును ఉపయోగించి రియల్-టైమ్ పర్యవేక్షణ మరియు వ్యాధి గుర్తింపు',
      weatherInsights: 'వాతావరణ అవగాహనలు',
      weatherInsightsDesc: 'మీ ప్రాంతానికి ఖచ్చితమైన వాతావరణ అంచనాలు మరియు వ్యవసాయ సలహాలు',
      marketplaceAccess: 'మార్కెట్‌ప్లేస్ యాక్సెస్',
      marketplaceAccessDesc: 'విత్తనాలు, పరికరాలు మరియు ఉత్పత్తుల కోసం కొనుగోలుదారులు మరియు అమ్మకందారులతో కనెక్ట్ అవ్వండి',
      aiAssistant: 'AI సహాయకుడు',
      aiAssistantDesc: '24/7 AI-నడిచే వ్యవసాయ సలహా మరియు మీ స్థానిక భాషలో మార్గదర్శకత్వం',
      communitySupport: 'కమ్యూనిటీ మద్దతు',
      communitySupportDesc: 'జ్ఞాన భాగస్వామ్యం కోసం తోటి రైతులు మరియు నిపుణులతో కనెక్ట్ అవ్వండి',
      
      // Farm Analysis
      selectLocation: 'మ్యాప్‌లో మీ పొలం ప్రాంతాన్ని ఎంచుకోండి',
      farmArea: 'పొలం వైశాల్యం (ఎకరాలు)',
      analyzeFarm: 'నా పొలాన్ని విశ్లేషించు',
      analysisReport: 'విశ్లేషణ నివేదిక',
      soilHealth: 'మట్టి ఆరోగ్యం',
      cropRecommendations: 'పంట సిఫార్సులు',
      
      // Crop Analysis
      uploadImage: 'పంట చిత్రాన్ని అప్‌లోడ్ చేయండి',
      dragDropImage: 'మీ చిత్రాన్ని ఇక్కడ లాగి వదలండి, లేదా ఎంచుకోవడానికి క్లిక్ చేయండి',
      analyzeImage: 'చిత్రాన్ని విశ్లేషించండి',
      cropHealth: 'పంట ఆరోగ్యం',
      diseaseDetection: 'వ్యాధి గుర్తింపు',
      healthScore: 'ఆరోగ్య స్కోర్',
      recommendations: 'సిఫార్సులు',
      
      // Weather
      currentWeather: 'ప్రస్తుత వాతావరణం',
      forecast: 'అంచనా',
      temperature: 'ఉష్ణోగ్రత',
      humidity: 'తేమ',
      windSpeed: 'గాలి వేగం',
      rainfall: 'వర్షపాతం',
      
      // Chatbot
      askQuestion: 'వ్యవసాయం గురించి ఏదైనా అడగండి...',
      popularQuestions: 'ప్రసిద్ధ ప్రశ్నలు',
      voiceAssistant: 'వాయిస్ అసిస్టెంట్',
      textChat: 'టెక్స్ట్ చాట్',
      startListening: 'వినడం ప్రారంభించు',
      stopListening: 'వినడం ఆపు',
      
      // Marketplace
      products: 'ఉత్పత్తులు',
      categories: 'వర్గాలు',
      priceRange: 'ధర పరిధి',
      location: 'స్థానం',
      seller: 'అమ్మకందారు',
      buyNow: 'ఇప్పుడు కొనండి',
      addToCart: 'కార్ట్‌కు జోడించు',
      
      // Community
      communityForum: 'కమ్యూనిటీ ఫోరమ్',
      askCommunity: 'కమ్యూనిటీని అడగండి',
      shareExperience: 'అనుభవాన్ని పంచుకోండి',
      expertAdvice: 'నిపుణుల సలహా',
      
      // Profile
      myProfile: 'నా ప్రొఫైల్',
      settings: 'సెట్టింగులు',
      language: 'భాష',
      notifications: 'నోటిఫికేషన్లు',
      logout: 'లాగ్ అవుట్',
      
      // Additional HomePage content
      login: 'లాగిన్',
      signUp: 'సైన్ అప్',
      accessDashboard: 'డ్యాష్‌బోర్డ్ యాక్సెస్',
      featuresSubtitle: 'మీ వ్యవసాయ పద్ధతులను ఆధునికీకరించడానికి సమగ్ర సాధనాలు మరియు అంతర్దృష్టులు',
      explore: 'అన్వేషించు',
      ctaTitle: 'మీ వ్యవసాయాన్ని మార్చడానికి సిద్ధంగా ఉన్నారా?',
      ctaSubtitle: 'కృషి సఖిని ఉపయోగించి వారి దిగుబడిలు మరియు ఆదాయాన్ని మెరుగుపరుచుకున్న వేలాది రైతులతో చేరండి',
      startAnalysis: 'ఇప్పుడు విశ్లేషణ ప్రారంభించు',
      loginToStart: 'ప్రారంభించడానికి లాగిన్ చేయండి',
      
      // Header content
      platformTagline: 'స్మార్ట్ ఫార్మ్ అనాలిసిస్ ప్లాట్‌ఫారమ్',
      signedInAs: 'దీనిగా సైన్ ఇన్ అయ్యారు',
      menu: 'మెనూ',
      
      // Weather specific
      temperatureTrend: 'ఉష్ణోగ్రత ప్రవృత్తి',
      rainProbability: 'వర్షం సాధ్యత',
      high: 'అధికం',
      low: 'తక్కువ'
    },
    kn: {
      // Navigation
      farmAnalysis: 'ಕೃಷಿ ವಿಶ್ಲೇಷಣೆ',
      cropAnalysis: 'ಬೆಳೆ ವಿಶ್ಲೇಷಣೆ',
      chatbot: 'AI ಸಹಾಯಕ',
      marketplace: 'ಮಾರುಕಟ್ಟೆ',
      weather: 'ಹವಾಮಾನ',
      profile: 'ಪ್ರೊಫೈಲ್',
      home: 'ಹೋಮ್',
      community: 'ಸಮುದಾಯ',
      
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
      submit: 'ಸಲ್ಲಿಸು',
      back: 'ಹಿಂದೆ',
      next: 'ಮುಂದಿನದು',
      previous: 'ಹಿಂದಿನದು',
      close: 'ಮುಚ್ಚಿರಿ',
      
      // Home Page
      welcomeTitle: 'ಕೃಷಿ ಸಖಿಗೆ ಸ್ವಾಗತ',
      welcomeSubtitle: 'ಮೇಲೆ ವಿಳೆವಾರಿ ಮತ್ತು ನಿಲೈಯಾದ ಕೃಷಿಗೆ ನಿಮ್ಮ AI-ಚಾಲಿತ ಕೃಷಿ ಸಹಾಯಕ',
      getStarted: 'ಪ್ರಾರಂಭಿಸಿ',
      learnMore: 'ಹೆಚ್ಚಿನ ತೆಳಿಯಿರಿ',
      
      // Features
      featuresTitle: 'ಆಧುನಿಕ ರೈತರಿಗಗೆ ಶಕ್ತಿವನ್ತ ವೈಶಿಷ್ಟ್ಯಗಳು',
      smartAnalysis: 'ಸ್ಮಾರ್ಟ್ ಕೃಷಿ ವಿಶ್ಲೇಷಣೆ',
      smartAnalysisDesc: 'ನಿಮ್ಮ ಕೃಷಿ ಪರಿಸ್ಥಿತಿಗಳು, ಮಣ್ಣಿನ ಆರೋಗ್ಯ ಮತ್ತು ಬೆಳೆ ಶಿಫಾರಸುಗಳ AI-ಚಾಲಿತ ವಿಶ್ಲೇಷಣೆ',
      cropMonitoring: 'ಬೆಳೆ ಆರೋಗ್ಯ ನಿರೀಕ್ಷಣೆ',
      cropMonitoringDesc: 'ನಕ್ಷತ್ರ ಚಿತ್ರ ಗುರುತಿಸುವಿಕೆಯನ್ನು ವಸೕ ಕೆ ಸಹ ಈಗ ದಿನ ಕ್ಷ ನಿರೀಕ್ಷಣೆ ಮತ್ತು ರೋಗ ಪತ್ತೆಹಿಡಿಸುವಿಕೆ',
      weatherInsights: 'ಹವಾಮಾನ ಅಂತರ್ದೃಷ್ಟಿಗಳು',
      weatherInsightsDesc: 'ನಿಮ್ಮ ಪ್ರದೇಶಕ್ಕೆ ಸದುಸ್ವ ಹವಾಮಾನ ಪೂರ್ವಾನುಮಾನಗಳು ಮತ್ತು ಕೃಷಿ ಸಲಹೆಗಳು',
      marketplaceAccess: 'ಮಾರುಕಟ್ಟೆ ಉಪಯೋಗ',
      marketplaceAccessDesc: 'ಬೀಜಗಳು, ಸಾಧನಗಳು ಮತ್ತು ಉತ್ಪನ್ನಗಳಿಗೆ ಕೊಂಡಗಂ ವ್ರ ಮತ್ತು ಮಾರಾಟಗಾರರನ್ನ ಪರಸ್ವ ಇಂಡು ಚೆಂದು ನ ಉ಴ಲಕ್ಗೆ ತ',
      aiAssistant: 'AI ಸಹಾಯಕ',
      aiAssistantDesc: '24/7 AI-ಚಾಲಿತ ಕೃಷಿ ಸಲಹೆ ಮತ್ತು ನಿಮ್ಮ ಸ್ಥಾನೀಯ ಭಾಷೆಯಲ್ಲಿ ಮಾರ್ಗದರ್ಶನ',
      communitySupport: 'ಸಮುದಾಯ ಸಹಾಯ',
      communitySupportDesc: 'ಜ್ಞಾನ ಸಾಝಾಕರಣಕ್ಕೆ ಸಹ ರೈತರು ಮತ್ತು ನಿಪುಣರು ಜೊತೆ ಜೋಡಿಸಿಕೊಳ್ಳಿ',
      
      // Farm Analysis
      selectLocation: 'ನಕ್ಷೆಯಲ್ಲಿ ನಿಮ್ಮ ಕೃಷಿ ಸ್ಥಳವನ್ನು ಆಯ್ಕೆಮಾಡಿ',
      farmArea: 'ಕೃಷಿ ಪ್ರದೇಶ (ಎಕರೆ)',
      analyzeFarm: 'ನನ್ನ ಕೃಷಿಯನ್ನು ವಿಶ್ಲೇಷಿಸು',
      analysisReport: 'ವಿಶ್ಲೇಷಣೆ ವರದಿ',
      soilHealth: 'ಮಣ್ಣಿನ ಆರೋಗ್ಯ',
      cropRecommendations: 'ಬೆಳೆ ಶಿಫಾರಸುಗಳು',
      
      // Crop Analysis
      uploadImage: 'ಬೆಳೆ ಚಿತ್ರವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ',
      dragDropImage: 'ನಿಮ್ಮ ಚಿತ್ರವನ್ನು ಇಲ್ಲಿಗೆ ಎಜೆದು ಹಿಂದಿರಿ, ಅಕ ರಸ್ತೆ ಎಂಚುಕಳಿಕೆ ಕ್ಲಿಕ್ ಮಾಡಿ',
      analyzeImage: 'ಚಿತ್ರವನ್ನು ವಿಶ್ಲೇಷಿಸಿ',
      cropHealth: 'ಬೆಳೆ ಆರೋಗ್ಯ',
      diseaseDetection: 'ರೋಗ ವಾಟಗುಂಡದಿ',
      healthScore: 'ಆರೋಗ್ಯ ಕ್ಱೆ',
      recommendations: 'ಶಿಫಾರಸುಗಳು',
      
      // Weather
      currentWeather: 'ಸದ್ಯನ ಹವಾಮಾನ',
      forecast: 'ಪೂರ್ವಾನುಮಾನ',
      temperature: 'ತಾಪಮಾನ',
      humidity: 'ಆರ್ದ್ರತೆ',
      windSpeed: 'ಗಾಳಿಯ ವೇಗ',
      rainfall: 'ಮಳೆ',
      
      // Chatbot
      askQuestion: 'ಕೃಷಿಯ ಬಗ್ಗೆ ಏನನ್ನೂ ಕೇಳಿ...',
      popularQuestions: 'ಜನಪ್ರಿಯ ಪ್ರಶ್ನೆಗಳು',
      voiceAssistant: 'ಸ್ವರ ಸಹಾಯಕ',
      textChat: 'ಪಠ್ಯ ಗುಡುಗುಡಲವಲ',
      startListening: 'ಕೇಳುವುದು ಪ್ರಾರಂಭಿಸಿ',
      stopListening: 'ಕೇಳುವುದು ನಿಲ್ಲಿಸಿ',
      
      // Marketplace
      products: 'ಉತ್ಪನ್ನಗಳು',
      categories: 'ವರ್ಗಗಳು',
      priceRange: 'ಬೆಲೆ ವ್ಯಾಪ್ತಿ',
      location: 'ಸ್ಥಳ',
      seller: 'ಮಾರಾಟಗಾರ',
      buyNow: 'ಇಬ್ಬರೂ ಕೊಂಡಗಳಿ',
      addToCart: 'ಕಾರ್ಟ್‌ಗೆ ಸೇರಿಸಿ',
      
      // Community
      communityForum: 'ಸಮುದಾಯ ಚರ್ಚೆಮಂಚ',
      askCommunity: 'ಸಮುದಾಯನ್ನು ಕೇಳಿಸಿ',
      shareExperience: 'ಅನುಭವವನ್ನು ಸಾಝಾಮಾಡಿಕೊಳ್ಳಿ',
      expertAdvice: 'ನಿಪುಣರ ಸಲಹೆ',
      
      // Profile
      myProfile: 'ನನ್ನ ಪ್ರೊಫೈಲ್',
      settings: 'ಸೆಟ್ಟಿಂಗ್ಗಳು',
      language: 'ಭಾಷೆ',
      notifications: 'ಅಧಿಸೂಚನೆಗಳು',
      logout: 'ಲಾಗ್ ಆಉಟ್',
      
      // Additional HomePage content
      login: 'ಲಾಗಿನ್',
      signUp: 'ಸೈನ್ ಅಪ್',
      accessDashboard: 'ಡ್ಯಾಷ್‌ಬೋರ್ಡ್ ಅಕ್ಸೆಸ್',
      featuresSubtitle: 'ನಿಮ್ಮ ಕೃಷಿ ಪದ್ಧತಿಗಳನ್ನು ಆಧುನಿಕದಖೆಚ್ ಚ೯ ಸಂಗ್ರ ಸಾಧನಗಳು ಮತ್ತು ಅಂತರ್ದೃಷ್ಟಿಗಳು',
      explore: 'ಅನ್ವೇಷಿಸಿ',
      ctaTitle: 'ನಿಮ್ಮ ಕೃಷಿಯನ್ನು ಬದಲಾಯಿಸಲು ಸಿದ್ಧರಾಗಿದ್ದೀರಾ?',
      ctaSubtitle: 'ಕೃಷಿ ಸಖಿಯನ್ನು ಉಪಯೋಗಿಸಿ ತಮ್ಮ ವಿಳೆವಾರಿ ಮತ್ತು ಆದಾಯವನ್ನು ಮೇಲೇಪಡಿಸಿಕೊಣ್ಡಿರುವ ಸಾವಿರಾರು ರೈತರನ್ನು ಜೋಡಿಸಿಕೊಳ್ಳಿ',
      startAnalysis: 'ಇಬ್ಬರೂ ವಿಶ್ಲೇಷಣೆ ಪ್ರಾರಂಭಿಸಿ',
      loginToStart: 'ಪ್ರಾರಂಭಿಸಲು ಲಾಗಿನ್ ಮಾಡಿ',
      
      // Header content
      platformTagline: 'ಸ್ಮಾರ್ಟ್ ಫಾರ್ಮ್ ಅನಾಲಿಸಿಸ್ ಪ್ಲಾಟ್‌ಫಾರ್ಮ್',
      signedInAs: 'ಇದರಿಂದ ಸೈನ್ ಇನ್ ಮಾಡಿಕೊಣ್ಡಿದ್ದೀರಿ',
      menu: 'ಮೆನು',
      
      // Weather specific
      temperatureTrend: 'ತಾಪಮಾನ ಪ್ರವೃತ್ತಿ',
      rainProbability: 'ಮಳೆಯ ಸಾಧ್ಯತೆ',
      high: 'ಅಧಿಕ',
      low: 'ಕಮ್ಮಿ'
    },
    gu: {
      // Navigation
      farmAnalysis: 'ખેતી વિશ્લેષણ',
      cropAnalysis: 'પાક વિશ્લેષણ',
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
      cropAnalysis: 'पीक विश्लेषण',
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
      cropAnalysis: 'ਫਸਲ ਵਿਸ਼ਲੇਸ਼ਣ',
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
      cropAnalysis: 'ফসল বিশ্লেষণ',
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
      cropAnalysis: 'ଫସଲ ବିଶ୍ଳେଷଣ',
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