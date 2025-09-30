// controllers/analysisController.js
const db = require('../config/db');
const geoApiService = require('../services/geoApiService');

const getFarmAnalysis = async (req, res) => {
  const { latitude, longitude, acres, farmName } = req.body;

  // 1. Input Validation
  if (!latitude || !longitude || !acres) {
    return res.status(400).json({ 
      error: 'Latitude, longitude, and acres are required.',
      received: { latitude, longitude, acres }
    });
  }

  // Validate numeric values
  const lat = parseFloat(latitude);
  const lng = parseFloat(longitude);
  const farmAcres = parseFloat(acres);

  if (isNaN(lat) || isNaN(lng) || isNaN(farmAcres)) {
    return res.status(400).json({ 
      error: 'Latitude, longitude, and acres must be valid numbers.' 
    });
  }

  // Validate coordinate ranges
  if (lat < -90 || lat > 90 || lng < -180 || lng > 180) {
    return res.status(400).json({ 
      error: 'Invalid coordinates. Latitude must be between -90 and 90, longitude between -180 and 180.' 
    });
  }

  if (farmAcres <= 0 || farmAcres > 10000) {
    return res.status(400).json({ 
      error: 'Farm area must be between 0 and 10000 acres.' 
    });
  }

  try {
    // 2. Save/Find the farm in the database (mock implementation)
    let farmId = `farm_${Date.now()}`; // Mock farm ID
    
    // In production, this would be:
    // let farmResult = await db.query(
    //   'SELECT id FROM farms WHERE latitude = $1 AND longitude = $2 AND area_acres = $3',
    //   [lat, lng, farmAcres]
    // );
    
    console.log(`Processing analysis for farm: ${farmId}`);
    console.log(`Location: ${lat}, ${lng} | Area: ${farmAcres} acres`);

    // 3. Fetch data from all external services in parallel for efficiency
    const [soilData, landVegData, groundwaterData] = await Promise.all([
      geoApiService.fetchSoilData(lat, lng),
      geoApiService.fetchLandAndVegData(lat, lng),
      geoApiService.fetchGroundwaterData(lat, lng),
    ]);
    
    // 4. Aggregate data into a unified report structure
    const finalReport = {
      farm_id: farmId,
      farm_name: farmName || 'Unnamed Farm',
      location: { 
        latitude: lat, 
        longitude: lng, 
        acres: farmAcres 
      },
      land_cover: landVegData.land_cover,
      vegetation_index: landVegData.vegetation_index,
      soil_properties: {
        texture: soilData.texture,
        ph: parseFloat(soilData.ph.toFixed(1)),
        organic_carbon_percent: parseFloat(soilData.organic_carbon_percent.toFixed(2)),
      },
      nutrient_levels: soilData.nutrient_levels,
      groundwater: groundwaterData,
      analysis_timestamp: new Date().toISOString(),
      recommendations: generateRecommendations(soilData, landVegData, groundwaterData)
    };

    // 5. In production, cache the report in database
    // await db.query(
    //   'INSERT INTO analysis_reports (farm_id, report_data) VALUES ($1, $2)',
    //   [farmId, finalReport]
    // );

    // 6. Send the final report to the client
    res.status(200).json({
      success: true,
      data: finalReport
    });

  } catch (error) {
    console.error('Error during farm analysis:', error);
    res.status(500).json({ 
      error: 'An internal server error occurred.',
      message: error.message 
    });
  }
};

// Helper function to generate recommendations based on analysis
const generateRecommendations = (soilData, landVegData, groundwaterData) => {
  const recommendations = [];
  
  // Soil-based recommendations
  if (soilData.ph < 6.0) {
    recommendations.push({
      type: 'soil',
      priority: 'high',
      message: 'Your soil is acidic. Consider adding lime to increase pH.'
    });
  }
  
  // Nutrient recommendations
  if (soilData.nutrient_levels.nitrogen === 'Low') {
    recommendations.push({
      type: 'nutrient',
      priority: 'high',
      message: 'Low nitrogen levels detected. Apply organic compost or nitrogen-rich fertilizers.'
    });
  }
  
  // Water recommendations
  if (groundwaterData.depth_meters > 30) {
    recommendations.push({
      type: 'water',
      priority: 'medium',
      message: 'Deep groundwater table. Consider rainwater harvesting and drip irrigation.'
    });
  }
  
  return recommendations;
};

module.exports = {
  getFarmAnalysis,
};