const axios = require('axios');

// Mock weather data for different regions in India
const getMockWeatherData = (lat, lng) => {
  // Determine region based on coordinates
  let region = 'Kerala';
  if (lat > 15 && lat < 20) region = 'Maharashtra';
  else if (lat > 20 && lat < 25) region = 'Madhya Pradesh';
  else if (lat > 25) region = 'North India';

  // Generate realistic weather data based on region
  const baseTemp = region === 'Kerala' ? 28 : region === 'North India' ? 20 : 25;
  const humidity = region === 'Kerala' ? 75 : 60;

  return {
    location: {
      coordinates: { lat, lng },
      name: `Location in ${region}`,
      district: region === 'Kerala' ? 'Thrissur' : region === 'Maharashtra' ? 'Pune' : 'Unknown',
      state: region,
      country: 'IN'
    },
    current: {
      temperature: baseTemp + Math.random() * 6 - 3,
      feelsLike: baseTemp + Math.random() * 8 - 4,
      humidity: humidity + Math.random() * 20 - 10,
      pressure: 1013 + Math.random() * 20 - 10,
      windSpeed: Math.random() * 15,
      windDirection: Math.random() * 360,
      visibility: 8 + Math.random() * 7,
      uvIndex: Math.random() * 8,
      condition: 'Partly Cloudy',
      description: 'Partly cloudy with light winds',
      icon: 'partly-cloudy',
      cloudCover: 30 + Math.random() * 40,
      dewPoint: baseTemp - 5 + Math.random() * 5
    },
    daily: [
      {
        date: new Date(),
        temperature: {
          min: baseTemp - 5,
          max: baseTemp + 8,
          morning: baseTemp - 2,
          day: baseTemp + 5,
          evening: baseTemp + 2,
          night: baseTemp - 3
        },
        humidity: humidity,
        pressure: 1013,
        windSpeed: 12,
        windDirection: 180,
        precipitation: {
          probability: region === 'Kerala' ? 40 : 20,
          amount: region === 'Kerala' ? 5 : 1,
          type: 'rain'
        },
        condition: 'Partly Cloudy',
        description: 'Partly cloudy with possible light rain',
        icon: 'partly-cloudy-rain',
        sunrise: new Date(new Date().setHours(6, 30)),
        sunset: new Date(new Date().setHours(18, 45)),
        moonPhase: 0.5,
        uvIndex: 6
      }
    ],
    hourly: Array.from({ length: 24 }, (_, i) => ({
      time: new Date(new Date().setHours(i)),
      temperature: baseTemp + Math.sin(i * Math.PI / 12) * 5,
      feelsLike: baseTemp + Math.sin(i * Math.PI / 12) * 6,
      humidity: humidity + Math.cos(i * Math.PI / 12) * 15,
      pressure: 1013,
      windSpeed: 8 + Math.random() * 8,
      windDirection: 180 + Math.random() * 90 - 45,
      precipitation: {
        probability: Math.random() * 30,
        amount: Math.random() * 2
      },
      condition: i > 6 && i < 18 ? 'Sunny' : 'Clear',
      icon: i > 6 && i < 18 ? 'sunny' : 'clear-night',
      cloudCover: 20 + Math.random() * 60
    })),
    alerts: region === 'Kerala' ? [
      {
        title: 'Heavy Rain Warning',
        description: 'Heavy rainfall expected in coastal areas. Farmers advised to take precautions.',
        severity: 'moderate',
        startTime: new Date(),
        endTime: new Date(Date.now() + 24 * 60 * 60 * 1000),
        areas: ['Coastal Kerala', 'Thrissur', 'Ernakulam']
      }
    ] : [],
    agriculture: {
      soilTemperature: baseTemp + 2,
      soilMoisture: region === 'Kerala' ? 65 : 45,
      evapotranspiration: 4.2,
      growingDegreeDays: Math.max(0, (baseTemp + 8 + baseTemp - 5) / 2 - 10),
      recommendations: [
        {
          type: 'irrigation',
          message: region === 'Kerala' ? 
            'Due to high humidity, reduce watering frequency. Check soil moisture before irrigation.' :
            'Current weather is suitable for irrigation. Water early morning or evening.',
          priority: 'medium',
          validUntil: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
        },
        {
          type: 'pest-control',
          message: 'High humidity may increase pest activity. Monitor crops closely.',
          priority: region === 'Kerala' ? 'high' : 'medium',
          validUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        }
      ]
    },
    source: {
      provider: 'mock-weather-service',
      lastUpdated: new Date(),
      cacheExpiry: new Date(Date.now() + 30 * 60 * 1000) // 30 minutes
    },
    metadata: {
      accuracy: 85,
      dataQuality: 'good',
      timezone: 'Asia/Kolkata',
      language: 'en'
    }
  };
};

// Get weather data for location
const getWeatherData = async (lat, lng) => {
  try {
    // For demo purposes, return mock data
    // In production, this would call external weather APIs
    const weatherData = getMockWeatherData(lat, lng);
    
    return {
      success: true,
      data: weatherData,
      cached: false
    };
  } catch (error) {
    console.error('Weather service error:', error);
    throw error;
  }
};

// Get weather forecast for multiple days
const getWeatherForecast = async (lat, lng, days = 7) => {
  try {
    const baseData = getMockWeatherData(lat, lng);
    
    // Generate forecast for multiple days
    const forecast = Array.from({ length: days }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() + i);
      
      return {
        date,
        temperature: {
          min: baseData.current.temperature - 5 + Math.random() * 4 - 2,
          max: baseData.current.temperature + 8 + Math.random() * 4 - 2,
          morning: baseData.current.temperature - 2,
          day: baseData.current.temperature + 5,
          evening: baseData.current.temperature + 2,
          night: baseData.current.temperature - 3
        },
        humidity: baseData.current.humidity + Math.random() * 20 - 10,
        precipitation: {
          probability: Math.random() * 60,
          amount: Math.random() * 10,
          type: 'rain'
        },
        windSpeed: baseData.current.windSpeed + Math.random() * 10 - 5,
        condition: ['Sunny', 'Partly Cloudy', 'Cloudy', 'Light Rain'][Math.floor(Math.random() * 4)],
        uvIndex: Math.random() * 8
      };
    });
    
    return {
      success: true,
      data: {
        location: baseData.location,
        forecast,
        agriculture: baseData.agriculture
      }
    };
  } catch (error) {
    console.error('Weather forecast error:', error);
    throw error;
  }
};

// Get agricultural weather insights
const getAgricultureWeatherInsights = async (lat, lng, cropType) => {
  try {
    const weatherData = await getWeatherData(lat, lng);
    
    if (!weatherData.success) {
      throw new Error('Failed to get weather data');
    }
    
    const { current, agriculture } = weatherData.data;
    const insights = [];
    
    // Temperature-based insights
    if (current.temperature > 35) {
      insights.push({
        type: 'warning',
        category: 'temperature',
        message: 'High temperature detected. Ensure adequate irrigation and provide shade for sensitive crops.',
        action: 'Increase watering frequency, use mulching',
        priority: 'high'
      });
    }
    
    // Humidity-based insights
    if (current.humidity > 80) {
      insights.push({
        type: 'warning',
        category: 'humidity',
        message: 'Very high humidity may lead to fungal diseases. Ensure good ventilation.',
        action: 'Apply fungicide if necessary, improve air circulation',
        priority: 'medium'
      });
    }
    
    // Rain-based insights
    const todayRain = weatherData.data.daily[0]?.precipitation;
    if (todayRain && todayRain.probability > 70) {
      insights.push({
        type: 'info',
        category: 'precipitation',
        message: 'High chance of rain today. Skip irrigation and prepare for water logging.',
        action: 'Cancel irrigation, check drainage systems',
        priority: 'medium'
      });
    }
    
    // Crop-specific insights
    if (cropType) {
      if (cropType.toLowerCase().includes('rice')) {
        insights.push({
          type: 'tip',
          category: 'crop-specific',
          message: 'Current weather is suitable for rice cultivation. Maintain water level in fields.',
          action: 'Monitor water levels, apply fertilizer as needed',
          priority: 'low'
        });
      } else if (cropType.toLowerCase().includes('coconut')) {
        insights.push({
          type: 'tip',
          category: 'crop-specific',
          message: 'Coconut palms need adequate water during dry periods. Check soil moisture.',
          action: 'Deep watering once a week, mulch around trees',
          priority: 'low'
        });
      }
    }
    
    return {
      success: true,
      data: {
        location: weatherData.data.location,
        insights,
        weatherSummary: {
          temperature: current.temperature,
          humidity: current.humidity,
          condition: current.condition,
          recommendation: insights.length > 0 ? insights[0].message : 'Weather conditions are favorable for farming'
        },
        agriculture: agriculture
      }
    };
    
  } catch (error) {
    console.error('Agriculture weather insights error:', error);
    throw error;
  }
};

module.exports = {
  getWeatherData,
  getWeatherForecast,
  getAgricultureWeatherInsights
};