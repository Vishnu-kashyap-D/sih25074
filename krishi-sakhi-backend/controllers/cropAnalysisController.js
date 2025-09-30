const multer = require('multer');
const path = require('path');
const fs = require('fs').promises;
const cropAnalysisService = require('../src/services/cropAnalysisService');

// Configure multer for file upload
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);
  
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Only image files (JPEG, JPG, PNG, GIF) are allowed'));
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: fileFilter
}).single('image');

// Analyze crop image
const analyzeCropImage = async (req, res) => {
  try {
    // Handle file upload
    upload(req, res, async (err) => {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({
          success: false,
          error: 'File upload error',
          details: err.message
        });
      } else if (err) {
        return res.status(400).json({
          success: false,
          error: err.message
        });
      }
      
      if (!req.file) {
        return res.status(400).json({
          success: false,
          error: 'No image file provided'
        });
      }
      
      try {
        // Get crop type from request or auto-detect
        const cropType = req.body.cropType || 'auto-detect';
        const userId = req.body.userId || null;
        
        console.log(`Analyzing crop image: ${req.file.originalname}, Size: ${req.file.size} bytes`);
        
        // Analyze the image using the service
        const analysisResult = await cropAnalysisService.processImageWithAI(
          req.file.originalname,
          req.file.buffer
        );
        
        res.json({
          success: true,
          data: analysisResult,
          message: 'Crop analysis completed successfully'
        });
        
      } catch (analysisError) {
        console.error('Crop analysis error:', analysisError);
        res.status(500).json({
          success: false,
          error: 'Failed to analyze crop image',
          details: analysisError.message
        });
      }
    });
    
  } catch (error) {
    console.error('Crop analysis controller error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      details: error.message
    });
  }
};

// Get analysis history for a user
const getAnalysisHistory = async (req, res) => {
  try {
    const { userId } = req.params;
    const { limit = 10, offset = 0 } = req.query;
    
    if (!userId) {
      return res.status(400).json({
        success: false,
        error: 'User ID is required'
      });
    }
    
    // Get history from service
    const history = await cropAnalysisService.getAnalysisHistory(userId);
    
    res.json({
      success: true,
      data: {
        history: history,
        total: history.length,
        limit: parseInt(limit),
        offset: parseInt(offset)
      }
    });
    
  } catch (error) {
    console.error('Get analysis history error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch analysis history',
      details: error.message
    });
  }
};

// Get supported crop types
const getSupportedCrops = async (req, res) => {
  try {
    const supportedCrops = cropAnalysisService.getSupportedCrops();
    
    res.json({
      success: true,
      data: {
        crops: supportedCrops,
        total: supportedCrops.length
      }
    });
    
  } catch (error) {
    console.error('Get supported crops error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch supported crops',
      details: error.message
    });
  }
};

// Get common crop diseases
const getCommonDiseases = async (req, res) => {
  try {
    const { cropType } = req.query;
    
    let diseases = [
      {
        id: '1',
        name: 'Early Blight',
        crops: ['tomato', 'potato'],
        symptoms: 'Dark spots with concentric rings on leaves',
        treatment: 'Apply copper-based fungicide'
      },
      {
        id: '2',
        name: 'Bacterial Leaf Blight',
        crops: ['rice'],
        symptoms: 'Water-soaked lesions on leaves',
        treatment: 'Use resistant varieties, apply bactericides'
      },
      {
        id: '3',
        name: 'Powdery Mildew',
        crops: ['wheat', 'cucumber', 'grapes'],
        symptoms: 'White powdery spots on leaves and stems',
        treatment: 'Apply sulfur-based fungicides'
      },
      {
        id: '4',
        name: 'Root Rot',
        crops: ['cotton', 'sugarcane'],
        symptoms: 'Yellowing leaves, wilting, stunted growth',
        treatment: 'Improve drainage, apply fungicides'
      }
    ];
    
    if (cropType) {
      diseases = diseases.filter(disease => disease.crops.includes(cropType));
    }
    
    res.json({
      success: true,
      data: {
        diseases: diseases,
        total: diseases.length
      }
    });
    
  } catch (error) {
    console.error('Get common diseases error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch disease information',
      details: error.message
    });
  }
};

module.exports = {
  analyzeCropImage,
  getAnalysisHistory,
  getSupportedCrops,
  getCommonDiseases
};