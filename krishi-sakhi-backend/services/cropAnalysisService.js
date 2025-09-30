const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Gemini AI (optional - for future enhancement)
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || 'AIzaSyDt2oax1jQxa-Relo2e8mhfpoeZ089QhEg';
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

// Simulated AI model for crop analysis
const analyzeCropImage = async (imageBuffer, metadata) => {
  try {
    console.log(`Analyzing image: ${metadata.filename}, Type: ${metadata.cropType}`);
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Generate analysis based on random factors for demo
    const random = Math.random();
    const healthScore = Math.floor(70 + random * 25); // 70-95 range
    
    // Determine crop type (in real implementation, this would use AI)
    const cropTypes = ['Tomato', 'Rice', 'Wheat', 'Potato', 'Onion', 'Cotton', 'Maize'];
    const detectedCropType = metadata.cropType === 'auto-detect' 
      ? cropTypes[Math.floor(Math.random() * cropTypes.length)]
      : metadata.cropType;
    
    // Generate issues based on health score
    const issues = generateIssues(healthScore, detectedCropType);
    
    // Generate recommendations based on issues
    const recommendations = generateRecommendations(issues, detectedCropType);
    
    // Generate quality grade
    const qualityGrade = getQualityGrade(healthScore);
    
    // Market information
    const marketInfo = generateMarketInfo(detectedCropType, healthScore);
    
    const analysisResult = {
      cropInfo: {
        type: detectedCropType,
        variety: getVariety(detectedCropType),
        growthStage: getGrowthStage(detectedCropType),
        confidence: 0.85 + random * 0.1
      },
      healthScore,
      qualityGrade,
      issues,
      recommendations,
      marketInfo,
      analysisMetadata: {
        analysisDate: new Date(),
        imageSize: metadata.size,
        processingTime: '1.5s',
        modelVersion: '1.0.0',
        userId: metadata.userId
      }
    };
    
    // Optional: Use Gemini for additional insights
    if (process.env.USE_GEMINI === 'true') {
      try {
        const additionalInsights = await getGeminiInsights(detectedCropType, issues);
        analysisResult.aiInsights = additionalInsights;
      } catch (geminiError) {
        console.log('Gemini insights unavailable:', geminiError.message);
      }
    }
    
    return analysisResult;
    
  } catch (error) {
    console.error('Crop analysis service error:', error);
    throw error;
  }
};

const generateIssues = (healthScore, cropType) => {
  const issues = [];
  
  // Common diseases by crop type
  const diseasesByCrop = {
    'Tomato': ['Early Blight', 'Late Blight', 'Bacterial Spot', 'Tomato Yellow Leaf Curl'],
    'Rice': ['Bacterial Leaf Blight', 'Brown Spot', 'Sheath Blight', 'Blast Disease'],
    'Wheat': ['Rust', 'Powdery Mildew', 'Loose Smut', 'Karnal Bunt'],
    'Potato': ['Late Blight', 'Early Blight', 'Black Scurf', 'Common Scab'],
    'Cotton': ['Bollworm', 'Whitefly', 'Cotton Leaf Curl', 'Root Rot'],
    'Onion': ['Purple Blotch', 'Stemphylium Blight', 'Basal Rot', 'Downy Mildew'],
    'Maize': ['Corn Borer', 'Fall Armyworm', 'Maize Streak Virus', 'Gray Leaf Spot']
  };
  
  const nutrientDeficiencies = [
    'Nitrogen Deficiency',
    'Phosphorus Deficiency',
    'Potassium Deficiency',
    'Iron Deficiency',
    'Magnesium Deficiency'
  ];
  
  const diseases = diseasesByCrop[cropType] || ['Generic Fungal Disease', 'Bacterial Infection'];
  
  // Add issues based on health score
  if (healthScore < 85) {
    // Add a disease
    const disease = diseases[Math.floor(Math.random() * diseases.length)];
    issues.push({
      type: 'disease',
      name: disease,
      severity: healthScore < 75 ? 'Medium' : 'Low',
      confidence: 0.7 + Math.random() * 0.25,
      affectedArea: `${Math.floor(10 + Math.random() * 30)}%`,
      symptoms: getSymptoms(disease)
    });
  }
  
  if (healthScore < 90 && Math.random() > 0.5) {
    // Add nutrient deficiency
    const nutrient = nutrientDeficiencies[Math.floor(Math.random() * nutrientDeficiencies.length)];
    issues.push({
      type: 'nutrient',
      name: nutrient,
      severity: healthScore < 80 ? 'Medium' : 'Low',
      confidence: 0.6 + Math.random() * 0.3,
      symptoms: getNutrientSymptoms(nutrient)
    });
  }
  
  if (healthScore < 80 && Math.random() > 0.6) {
    // Add pest issue
    issues.push({
      type: 'pest',
      name: 'Aphids',
      severity: 'Low',
      confidence: 0.65,
      affectedArea: '8%',
      symptoms: 'Small insects visible on leaves, curled leaves'
    });
  }
  
  return issues;
};

const generateRecommendations = (issues, cropType) => {
  const recommendations = [];
  
  issues.forEach(issue => {
    if (issue.type === 'disease') {
      recommendations.push({
        category: 'treatment',
        priority: issue.severity === 'High' ? 'high' : issue.severity === 'Medium' ? 'medium' : 'low',
        action: `Apply fungicide for ${issue.name}`,
        details: getTreatmentDetails(issue.name),
        timeline: issue.severity === 'High' ? 'Immediate' : 'Within 3 days'
      });
    } else if (issue.type === 'nutrient') {
      recommendations.push({
        category: 'nutrition',
        priority: issue.severity === 'High' ? 'high' : 'medium',
        action: `Address ${issue.name}`,
        details: getNutrientTreatment(issue.name),
        timeline: 'Within 5 days'
      });
    } else if (issue.type === 'pest') {
      recommendations.push({
        category: 'pest-control',
        priority: 'medium',
        action: 'Apply pesticide for pest control',
        details: 'Use neem-based organic pesticide, spray in evening',
        timeline: 'Within 2 days'
      });
    }
  });
  
  // Add general care recommendations
  recommendations.push({
    category: 'care',
    priority: 'low',
    action: 'Regular monitoring',
    details: 'Check crops daily for new symptoms or pest activity',
    timeline: 'Ongoing'
  });
  
  return recommendations;
};

const getSymptoms = (disease) => {
  const symptoms = {
    'Early Blight': 'Dark spots with concentric rings on lower leaves',
    'Late Blight': 'Water-soaked spots on leaves, white fungal growth',
    'Bacterial Spot': 'Small, dark, greasy spots on leaves',
    'Rust': 'Orange-brown pustules on leaves and stems',
    'Powdery Mildew': 'White powdery coating on leaves',
    'Bacterial Leaf Blight': 'Water-soaked to yellowish stripes on leaf blades',
    'Bollworm': 'Holes in bolls, larvae visible',
    'Purple Blotch': 'Small water-soaked lesions with purple centers'
  };
  
  return symptoms[disease] || 'Visible disease symptoms on plant';
};

const getNutrientSymptoms = (deficiency) => {
  const symptoms = {
    'Nitrogen Deficiency': 'Yellowing of lower leaves, stunted growth',
    'Phosphorus Deficiency': 'Purple discoloration of leaves, delayed maturity',
    'Potassium Deficiency': 'Brown scorching on leaf edges, weak stems',
    'Iron Deficiency': 'Yellowing between leaf veins, young leaves affected',
    'Magnesium Deficiency': 'Yellowing between veins of older leaves'
  };
  
  return symptoms[deficiency] || 'Nutrient deficiency symptoms visible';
};

const getTreatmentDetails = (disease) => {
  const treatments = {
    'Early Blight': 'Use copper-based fungicide, spray every 7-10 days',
    'Late Blight': 'Apply systemic fungicide immediately, remove affected parts',
    'Bacterial Spot': 'Use copper hydroxide, improve air circulation',
    'Rust': 'Apply propiconazole fungicide, remove infected leaves',
    'Powdery Mildew': 'Use sulfur-based fungicide, ensure proper spacing',
    'Bacterial Leaf Blight': 'Apply streptomycin, use resistant varieties',
    'Bollworm': 'Use Bt spray or spinosad, monitor regularly',
    'Purple Blotch': 'Apply mancozeb, practice crop rotation'
  };
  
  return treatments[disease] || 'Apply appropriate fungicide/pesticide as recommended';
};

const getNutrientTreatment = (deficiency) => {
  const treatments = {
    'Nitrogen Deficiency': 'Apply urea or ammonium sulfate at 50kg/acre',
    'Phosphorus Deficiency': 'Apply DAP (Diammonium Phosphate) at 40kg/acre',
    'Potassium Deficiency': 'Apply Muriate of Potash at 30kg/acre',
    'Iron Deficiency': 'Foliar spray of ferrous sulfate 0.5% solution',
    'Magnesium Deficiency': 'Apply magnesium sulfate at 25kg/acre'
  };
  
  return treatments[deficiency] || 'Apply appropriate fertilizer based on soil test';
};

const getQualityGrade = (healthScore) => {
  if (healthScore >= 90) return 'A+';
  if (healthScore >= 85) return 'A';
  if (healthScore >= 80) return 'B+';
  if (healthScore >= 75) return 'B';
  if (healthScore >= 70) return 'C+';
  return 'C';
};

const getVariety = (cropType) => {
  const varieties = {
    'Tomato': 'Cherry Tomato',
    'Rice': 'Basmati',
    'Wheat': 'Durum Wheat',
    'Potato': 'Russet Potato',
    'Cotton': 'Bt Cotton',
    'Onion': 'Red Onion',
    'Maize': 'Sweet Corn'
  };
  
  return varieties[cropType] || 'Local Variety';
};

const getGrowthStage = (cropType) => {
  const stages = ['Seedling', 'Vegetative', 'Flowering', 'Fruiting', 'Maturity'];
  return stages[Math.floor(Math.random() * stages.length)];
};

const generateMarketInfo = (cropType, healthScore) => {
  const basePrices = {
    'Tomato': 35,
    'Rice': 25,
    'Wheat': 22,
    'Potato': 18,
    'Cotton': 55,
    'Onion': 28,
    'Maize': 20
  };
  
  const basePrice = basePrices[cropType] || 30;
  const qualityMultiplier = healthScore / 100;
  const currentPrice = Math.floor(basePrice * qualityMultiplier * (0.9 + Math.random() * 0.3));
  
  return {
    currentPrice: `₹${currentPrice}/kg`,
    pricetrend: Math.random() > 0.5 ? 'increasing' : 'stable',
    optimalHarvestTime: healthScore > 85 ? '5-7 days' : '7-10 days',
    expectedYield: `${Math.floor(healthScore * 0.9)}%`,
    nearbyMarkets: [
      { name: 'Local Mandi', distance: '5 km', price: `₹${currentPrice - 2}/kg` },
      { name: 'District Market', distance: '15 km', price: `₹${currentPrice + 3}/kg` }
    ]
  };
};

const getGeminiInsights = async (cropType, issues) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    const prompt = `As an agricultural expert, provide brief additional insights for a ${cropType} crop with the following issues: ${issues.map(i => i.name).join(', ')}. Focus on prevention and organic solutions.`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    
    return {
      additionalTips: response.text(),
      organic: true
    };
  } catch (error) {
    console.error('Gemini insights error:', error);
    return null;
  }
};

// Save analysis to database (mock implementation)
const saveAnalysis = async (analysisResult, userId) => {
  // In production, this would save to database
  console.log(`Saving analysis for user ${userId}`);
  return {
    id: Date.now().toString(),
    ...analysisResult,
    savedAt: new Date()
  };
};

module.exports = {
  analyzeCropImage,
  saveAnalysis
};