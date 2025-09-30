const weatherService = require('../services/weatherService');

// Get current weather for location
const getCurrentWeather = async (req, res) => {
  try {
    const { lat, lon } = req.query;

    // Validation
    if (!lat || !lon) {
      return res.status(400).json({
        error: 'Latitude and longitude are required',
        example: '/api/weather/current?lat=10.5276&lon=76.2144'
      });
    }

    const latitude = parseFloat(lat);
    const longitude = parseFloat(lon);

    if (isNaN(latitude) || isNaN(longitude)) {
      return res.status(400).json({
        error: 'Latitude and longitude must be valid numbers'
      });
    }

    if (latitude < -90 || latitude > 90) {
      return res.status(400).json({
        error: 'Latitude must be between -90 and 90'
      });
    }

    if (longitude < -180 || longitude > 180) {
      return res.status(400).json({
        error: 'Longitude must be between -180 and 180'
      });
    }

    const weatherData = await weatherService.getWeatherData(latitude, longitude);

    res.json({
      success: true,
      data: weatherData.data,
      cached: weatherData.cached || false
    });

  } catch (error) {
    console.error('Get current weather error:', error);
    res.status(500).json({
      error: 'Failed to fetch weather data',
      details: error.message
    });
  }
};

// Get weather forecast for location
const getWeatherForecast = async (req, res) => {
  try {
    const { lat, lon, days = 7 } = req.query;

    // Validation
    if (!lat || !lon) {
      return res.status(400).json({
        error: 'Latitude and longitude are required',
        example: '/api/weather/forecast?lat=10.5276&lon=76.2144&days=7'
      });
    }

    const latitude = parseFloat(lat);
    const longitude = parseFloat(lon);
    const forecastDays = Math.min(parseInt(days) || 7, 14); // Max 14 days

    if (isNaN(latitude) || isNaN(longitude)) {
      return res.status(400).json({
        error: 'Latitude and longitude must be valid numbers'
      });
    }

    const forecastData = await weatherService.getWeatherForecast(latitude, longitude, forecastDays);

    res.json({
      success: true,
      data: forecastData.data,
      requestedDays: forecastDays
    });

  } catch (error) {
    console.error('Get weather forecast error:', error);
    res.status(500).json({
      error: 'Failed to fetch weather forecast',
      details: error.message
    });
  }
};

// Get agricultural weather insights
const getAgricultureInsights = async (req, res) => {
  try {
    const { lat, lon, crop } = req.query;

    // Validation
    if (!lat || !lon) {
      return res.status(400).json({
        error: 'Latitude and longitude are required',
        example: '/api/weather/agriculture?lat=10.5276&lon=76.2144&crop=rice'
      });
    }

    const latitude = parseFloat(lat);
    const longitude = parseFloat(lon);

    if (isNaN(latitude) || isNaN(longitude)) {
      return res.status(400).json({
        error: 'Latitude and longitude must be valid numbers'
      });
    }

    const insights = await weatherService.getAgricultureWeatherInsights(
      latitude, 
      longitude, 
      crop
    );

    res.json({
      success: true,
      data: insights.data,
      crop: crop || 'general'
    });

  } catch (error) {
    console.error('Get agriculture insights error:', error);
    res.status(500).json({
      error: 'Failed to fetch agriculture weather insights',
      details: error.message
    });
  }
};

// Get weather summary for multiple locations (useful for dashboard)
const getWeatherSummary = async (req, res) => {
  try {
    const { locations } = req.body;

    if (!locations || !Array.isArray(locations)) {
      return res.status(400).json({
        error: 'Locations array is required',
        example: {
          locations: [
            { name: 'Thrissur', lat: 10.5276, lon: 76.2144 },
            { name: 'Kochi', lat: 9.9312, lon: 76.2673 }
          ]
        }
      });
    }

    if (locations.length > 10) {
      return res.status(400).json({
        error: 'Maximum 10 locations allowed per request'
      });
    }

    const summaries = await Promise.all(
      locations.map(async (location) => {
        try {
          const { lat, lon, name } = location;
          
          if (!lat || !lon) {
            return {
              location: name || 'Unknown',
              error: 'Missing coordinates'
            };
          }

          const weatherData = await weatherService.getWeatherData(lat, lon);
          
          return {
            location: name || `${lat}, ${lon}`,
            coordinates: { lat, lon },
            weather: {
              temperature: weatherData.data.current.temperature,
              condition: weatherData.data.current.condition,
              humidity: weatherData.data.current.humidity,
              precipitation: weatherData.data.daily[0]?.precipitation
            },
            agriculture: {
              soilMoisture: weatherData.data.agriculture.soilMoisture,
              recommendation: weatherData.data.agriculture.recommendations[0]?.message || 'No specific recommendations'
            }
          };
        } catch (error) {
          return {
            location: location.name || 'Unknown',
            error: error.message
          };
        }
      })
    );

    res.json({
      success: true,
      data: {
        summaries,
        timestamp: new Date()
      }
    });

  } catch (error) {
    console.error('Get weather summary error:', error);
    res.status(500).json({
      error: 'Failed to fetch weather summary',
      details: error.message
    });
  }
};

// Get weather alerts for region
const getWeatherAlerts = async (req, res) => {
  try {
    const { lat, lon, radius = 50 } = req.query;

    if (!lat || !lon) {
      return res.status(400).json({
        error: 'Latitude and longitude are required'
      });
    }

    const latitude = parseFloat(lat);
    const longitude = parseFloat(lon);

    const weatherData = await weatherService.getWeatherData(latitude, longitude);

    res.json({
      success: true,
      data: {
        location: weatherData.data.location,
        alerts: weatherData.data.alerts,
        radius: parseInt(radius),
        lastUpdated: weatherData.data.source.lastUpdated
      }
    });

  } catch (error) {
    console.error('Get weather alerts error:', error);
    res.status(500).json({
      error: 'Failed to fetch weather alerts',
      details: error.message
    });
  }
};

module.exports = {
  getCurrentWeather,
  getWeatherForecast,
  getAgricultureInsights,
  getWeatherSummary,
  getWeatherAlerts
};