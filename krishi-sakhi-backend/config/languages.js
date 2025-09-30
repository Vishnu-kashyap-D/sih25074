// Multilingual configuration for Krishi Sakhi
// Supports major Indian agricultural languages

const supportedLanguages = {
  en: {
    name: 'English',
    nativeName: 'English',
    code: 'en',
    direction: 'ltr',
    enabled: true,
    fallback: null
  },
  hi: {
    name: 'Hindi',
    nativeName: 'हिन्दी',
    code: 'hi',
    direction: 'ltr', 
    enabled: true,
    fallback: 'en'
  },
  ta: {
    name: 'Tamil',
    nativeName: 'தமிழ்',
    code: 'ta',
    direction: 'ltr',
    enabled: true,
    fallback: 'en'
  },
  te: {
    name: 'Telugu',
    nativeName: 'తెలుగు',
    code: 'te',
    direction: 'ltr',
    enabled: true,
    fallback: 'en'
  },
  kn: {
    name: 'Kannada',
    nativeName: 'ಕನ್ನಡ',
    code: 'kn',
    direction: 'ltr',
    enabled: true,
    fallback: 'en'
  },
  gu: {
    name: 'Gujarati',
    nativeName: 'ગુજરાતી',
    code: 'gu',
    direction: 'ltr',
    enabled: true,
    fallback: 'en'
  },
  mr: {
    name: 'Marathi',
    nativeName: 'मराठी',
    code: 'mr',
    direction: 'ltr',
    enabled: true,
    fallback: 'en'
  },
  pa: {
    name: 'Punjabi',
    nativeName: 'ਪੰਜਾਬੀ',
    code: 'pa',
    direction: 'ltr',
    enabled: true,
    fallback: 'en'
  },
  bn: {
    name: 'Bengali',
    nativeName: 'বাংলা',
    code: 'bn',
    direction: 'ltr',
    enabled: true,
    fallback: 'en'
  },
  or: {
    name: 'Odia',
    nativeName: 'ଓଡ଼ିଆ',
    code: 'or',
    direction: 'ltr',
    enabled: true,
    fallback: 'en'
  }
};

// Agricultural regions mapping to preferred languages
const regionalLanguages = {
  'Punjab': ['pa', 'hi', 'en'],
  'Haryana': ['hi', 'pa', 'en'],
  'Uttar Pradesh': ['hi', 'en'],
  'Bihar': ['hi', 'en'],
  'West Bengal': ['bn', 'hi', 'en'],
  'Odisha': ['or', 'hi', 'en'],
  'Jharkhand': ['hi', 'en'],
  'Chhattisgarh': ['hi', 'en'],
  'Madhya Pradesh': ['hi', 'en'],
  'Rajasthan': ['hi', 'en'],
  'Gujarat': ['gu', 'hi', 'en'],
  'Maharashtra': ['mr', 'hi', 'en'],
  'Goa': ['mr', 'en'],
  'Karnataka': ['kn', 'en'],
  'Andhra Pradesh': ['te', 'en'],
  'Telangana': ['te', 'hi', 'en'],
  'Tamil Nadu': ['ta', 'en'],
  'Kerala': ['en'], // Malayalam removed as requested
  'Assam': ['en'],
  'Meghalaya': ['en'],
  'Manipur': ['en'],
  'Mizoram': ['en'],
  'Tripura': ['bn', 'en'],
  'Nagaland': ['en'],
  'Arunachal Pradesh': ['en'],
  'Sikkim': ['en'],
  'Himachal Pradesh': ['hi', 'en'],
  'Uttarakhand': ['hi', 'en'],
  'Jammu and Kashmir': ['hi', 'en'],
  'Ladakh': ['hi', 'en'],
  'Delhi': ['hi', 'en'],
  'Chandigarh': ['hi', 'pa', 'en'],
  'Puducherry': ['ta', 'en']
};

// Get default language for a region
const getDefaultLanguageForRegion = (state) => {
  const languages = regionalLanguages[state];
  return languages ? languages[0] : 'en';
};

// Get supported languages for a region
const getSupportedLanguagesForRegion = (state) => {
  return regionalLanguages[state] || ['en'];
};

// Check if language is supported
const isLanguageSupported = (languageCode) => {
  return supportedLanguages.hasOwnProperty(languageCode) && 
         supportedLanguages[languageCode].enabled;
};

// Get language info
const getLanguageInfo = (languageCode) => {
  return supportedLanguages[languageCode] || supportedLanguages['en'];
};

// Get all enabled languages
const getAllEnabledLanguages = () => {
  return Object.entries(supportedLanguages)
    .filter(([code, info]) => info.enabled)
    .reduce((acc, [code, info]) => {
      acc[code] = info;
      return acc;
    }, {});
};

// Get fallback language
const getFallbackLanguage = (languageCode) => {
  const language = supportedLanguages[languageCode];
  return language ? (language.fallback || 'en') : 'en';
};

module.exports = {
  supportedLanguages,
  regionalLanguages,
  getDefaultLanguageForRegion,
  getSupportedLanguagesForRegion,
  isLanguageSupported,
  getLanguageInfo,
  getAllEnabledLanguages,
  getFallbackLanguage
};