const mongoose = require('mongoose');

const weatherCacheSchema = new mongoose.Schema({
  location: {
    coordinates: {
      lat: {
        type: Number,
        required: true
      },
      lng: {
        type: Number,
        required: true
      }
    },
    name: String,
    district: String,
    state: String,
    country: {
      type: String,
      default: 'IN'
    }
  },
  current: {
    temperature: Number,
    feelsLike: Number,
    humidity: Number,
    pressure: Number,
    windSpeed: Number,
    windDirection: Number,
    visibility: Number,
    uvIndex: Number,
    condition: String,
    description: String,
    icon: String,
    cloudCover: Number,
    dewPoint: Number
  },
  daily: [{
    date: Date,
    temperature: {
      min: Number,
      max: Number,
      morning: Number,
      day: Number,
      evening: Number,
      night: Number
    },
    humidity: Number,
    pressure: Number,
    windSpeed: Number,
    windDirection: Number,
    precipitation: {
      probability: Number,
      amount: Number,
      type: String // rain, snow, sleet
    },
    condition: String,
    description: String,
    icon: String,
    sunrise: Date,
    sunset: Date,
    moonPhase: Number,
    uvIndex: Number
  }],
  hourly: [{
    time: Date,
    temperature: Number,
    feelsLike: Number,
    humidity: Number,
    pressure: Number,
    windSpeed: Number,
    windDirection: Number,
    precipitation: {
      probability: Number,
      amount: Number
    },
    condition: String,
    icon: String,
    cloudCover: Number
  }],
  alerts: [{
    title: String,
    description: String,
    severity: {
      type: String,
      enum: ['minor', 'moderate', 'severe', 'extreme']
    },
    startTime: Date,
    endTime: Date,
    areas: [String]
  }],
  agriculture: {
    soilTemperature: Number,
    soilMoisture: Number,
    evapotranspiration: Number,
    growingDegreeDays: Number,
    recommendations: [{
      type: {
        type: String,
        enum: ['irrigation', 'harvesting', 'planting', 'pest-control', 'fertilization']
      },
      message: String,
      priority: {
        type: String,
        enum: ['low', 'medium', 'high', 'urgent']
      },
      validUntil: Date
    }]
  },
  source: {
    provider: {
      type: String,
      default: 'openweathermap'
    },
    apiKey: String,
    lastUpdated: {
      type: Date,
      default: Date.now
    },
    cacheExpiry: {
      type: Date,
      required: true
    }
  },
  metadata: {
    accuracy: Number,
    dataQuality: {
      type: String,
      enum: ['excellent', 'good', 'fair', 'poor']
    },
    timezone: String,
    language: {
      type: String,
      default: 'en'
    }
  }
}, {
  timestamps: true
});

// Indexes for efficient querying
weatherCacheSchema.index({ 'location.coordinates': '2dsphere' });
weatherCacheSchema.index({ 'source.cacheExpiry': 1 });
weatherCacheSchema.index({ 'source.lastUpdated': -1 });
weatherCacheSchema.index({ 'location.district': 1, 'location.state': 1 });

// TTL index for automatic cleanup of expired cache
weatherCacheSchema.index({ 'source.cacheExpiry': 1 }, { expireAfterSeconds: 0 });

// Virtual for checking if cache is fresh
weatherCacheSchema.virtual('isFresh').get(function() {
  return new Date() < this.source.cacheExpiry;
});

// Method to check if weather data needs updating
weatherCacheSchema.methods.needsUpdate = function(maxAgeMinutes = 30) {
  const maxAge = new Date(Date.now() - (maxAgeMinutes * 60 * 1000));
  return this.source.lastUpdated < maxAge;
};

// Static method to find nearby weather data
weatherCacheSchema.statics.findNearby = function(lat, lng, maxDistance = 10000) {
  return this.find({
    'location.coordinates': {
      $near: {
        $geometry: {
          type: 'Point',
          coordinates: [lng, lat]
        },
        $maxDistance: maxDistance
      }
    },
    'source.cacheExpiry': { $gt: new Date() }
  }).sort({ 'source.lastUpdated': -1 }).limit(1);
};

module.exports = mongoose.model('WeatherCache', weatherCacheSchema);