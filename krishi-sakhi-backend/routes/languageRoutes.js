const express = require('express');
const router = express.Router();
const {
  supportedLanguages,
  regionalLanguages,
  getDefaultLanguageForRegion,
  getSupportedLanguagesForRegion,
  isLanguageSupported,
  getLanguageInfo,
  getAllEnabledLanguages,
  getFallbackLanguage
} = require('../config/languages');

// Get all supported languages
router.get('/', (req, res) => {
  try {
    const languages = getAllEnabledLanguages();
    
    res.json({
      success: true,
      data: {
        languages,
        count: Object.keys(languages).length,
        default: 'en'
      },
      message: 'Supported languages retrieved successfully'
    });
  } catch (error) {
    console.error('Get languages error:', error);
    res.status(500).json({
      error: 'Failed to retrieve supported languages',
      details: error.message
    });
  }
});

// Get languages for specific region/state
router.get('/region/:state', (req, res) => {
  try {
    const { state } = req.params;
    
    if (!state) {
      return res.status(400).json({
        error: 'State parameter is required'
      });
    }

    const supportedLanguagesList = getSupportedLanguagesForRegion(state);
    const defaultLanguage = getDefaultLanguageForRegion(state);
    
    // Get full language info for each supported language
    const languagesInfo = supportedLanguagesList.reduce((acc, code) => {
      const info = getLanguageInfo(code);
      if (info) {
        acc[code] = info;
      }
      return acc;
    }, {});

    res.json({
      success: true,
      data: {
        state,
        languages: languagesInfo,
        supportedCodes: supportedLanguagesList,
        defaultLanguage,
        count: supportedLanguagesList.length
      },
      message: `Supported languages for ${state} retrieved successfully`
    });
  } catch (error) {
    console.error('Get regional languages error:', error);
    res.status(500).json({
      error: 'Failed to retrieve regional languages',
      details: error.message
    });
  }
});

// Validate if a language is supported
router.get('/validate/:languageCode', (req, res) => {
  try {
    const { languageCode } = req.params;
    
    if (!languageCode) {
      return res.status(400).json({
        error: 'Language code parameter is required'
      });
    }

    const isSupported = isLanguageSupported(languageCode);
    const languageInfo = getLanguageInfo(languageCode);
    const fallback = getFallbackLanguage(languageCode);

    res.json({
      success: true,
      data: {
        languageCode,
        isSupported,
        languageInfo: isSupported ? languageInfo : null,
        fallback,
        recommendation: isSupported ? languageCode : fallback
      },
      message: isSupported ? 'Language is supported' : 'Language not supported, fallback provided'
    });
  } catch (error) {
    console.error('Language validation error:', error);
    res.status(500).json({
      error: 'Failed to validate language',
      details: error.message
    });
  }
});

// Get language info by code
router.get('/info/:languageCode', (req, res) => {
  try {
    const { languageCode } = req.params;
    
    if (!languageCode) {
      return res.status(400).json({
        error: 'Language code parameter is required'
      });
    }

    const languageInfo = getLanguageInfo(languageCode);
    const isSupported = isLanguageSupported(languageCode);

    if (!isSupported) {
      return res.status(404).json({
        error: 'Language not found or not supported',
        availableLanguages: Object.keys(getAllEnabledLanguages())
      });
    }

    res.json({
      success: true,
      data: {
        ...languageInfo,
        isSupported: true
      },
      message: 'Language information retrieved successfully'
    });
  } catch (error) {
    console.error('Get language info error:', error);
    res.status(500).json({
      error: 'Failed to retrieve language information',
      details: error.message
    });
  }
});

// Get all regional mappings
router.get('/regions', (req, res) => {
  try {
    res.json({
      success: true,
      data: {
        mappings: regionalLanguages,
        regions: Object.keys(regionalLanguages),
        totalRegions: Object.keys(regionalLanguages).length
      },
      message: 'Regional language mappings retrieved successfully'
    });
  } catch (error) {
    console.error('Get regional mappings error:', error);
    res.status(500).json({
      error: 'Failed to retrieve regional mappings',
      details: error.message
    });
  }
});

module.exports = router;