// services/geoApiService.js
const axios = require('axios');

/**
 * MOCK FUNCTION for fetching soil data.
 * In a real application, this would use axios to call the ISRIC SoilGrids API.
 * @param {number} lat - Latitude
 * @param {number} lon - Longitude
 * @returns {Promise<object>} - A promise that resolves to soil properties.
 */
const fetchSoilData = async (lat, lon) => {
  console.log(`Mock Fetching Soil Data for: ${lat}, ${lon}`);
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Generate varied data based on location for realistic demo
  const variation = (lat + lon) % 10;
  const soilTypes = ["Sandy Loam", "Clay Loam", "Silt Loam", "Loamy Sand"];
  
  return {
    texture: soilTypes[variation % 4],
    ph: 5.5 + (variation * 0.2),
    organic_carbon_percent: 0.8 + (variation * 0.15),
    nutrient_levels: {
      nitrogen: variation < 3 ? "Low" : variation < 7 ? "Medium" : "High",
      phosphorus: variation < 4 ? "Low" : variation < 6 ? "Medium" : "High",
      potassium: variation < 2 ? "Low" : variation < 8 ? "Medium" : "High"
    }
  };
};

/**
 * MOCK FUNCTION for fetching land cover and vegetation data.
 * In a real application, this would use axios to call ISRO Bhuvan APIs.
 * @param {number} lat - Latitude
 * @param {number} lon - Longitude
 * @returns {Promise<object>} - A promise that resolves to land and vegetation data.
 */
const fetchLandAndVegData = async (lat, lon) => {
  console.log(`Mock Fetching Land/Veg Data for: ${lat}, ${lon}`);
  
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const variation = Math.abs((lat - lon) * 100) % 10;
  const landTypes = ["Agricultural Land", "Fallow Land", "Plantation", "Paddy Field"];
  
  return {
    land_cover: {
      class: landTypes[variation % 4]
    },
    vegetation_index: {
      ndvi: 0.3 + (variation * 0.06),
      remark: variation < 3 ? "Poor Vegetation" : variation < 7 ? "Moderate Vegetation" : "Healthy Vegetation"
    }
  };
};

/**
 * MOCK FUNCTION for fetching groundwater data.
 * In a real application, this would use axios to call state/central water board APIs.
 * @param {number} lat - Latitude
 * @param {number} lon - Longitude
 * @returns {Promise<object>} - A promise that resolves to groundwater data.
 */
const fetchGroundwaterData = async (lat, lon) => {
    console.log(`Mock Fetching Groundwater Data for: ${lat}, ${lon}`);
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const variation = (lat * lon) % 20;
    const depths = [8, 12, 15, 20, 25, 30, 35, 40];
    const availability = variation < 10 ? "Good" : variation < 15 ? "Moderate" : "Low";
    
    return {
        depth_meters: depths[variation % 8],
        availability: availability
    };
};

module.exports = {
  fetchSoilData,
  fetchLandAndVegData,
  fetchGroundwaterData,
};