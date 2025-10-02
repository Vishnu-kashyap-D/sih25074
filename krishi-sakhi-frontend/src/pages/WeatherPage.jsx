import React, { useState, useEffect } from 'react';
import { FaCloudSun, FaUmbrella, FaTint, FaWind, FaThermometerHalf, FaCompass, FaEye, FaSun, FaExclamationTriangle, FaMapMarkerAlt, FaSync, FaClock } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';
import axios from 'axios';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const WeatherPage = () => {
  const { translate } = useLanguage();
  const [weatherData, setWeatherData] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState({ lat: 10.5276, lon: 76.2144 }); // Default to Thrissur
  const [selectedTab, setSelectedTab] = useState('current');
  const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => {
    fetchWeatherData();
    const interval = setInterval(fetchWeatherData, 600000); // Update every 10 minutes
    return () => clearInterval(interval);
  }, [location]);

  const fetchWeatherData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Fetch current weather and forecast in parallel
      const [currentResponse, forecastResponse] = await Promise.all([
        axios.get(`http://localhost:3001/api/weather/current?lat=${location.lat}&lon=${location.lon}`),
        axios.get(`http://localhost:3001/api/weather/forecast?lat=${location.lat}&lon=${location.lon}&days=7`)
      ]);
      
      if (currentResponse.data.success) {
        setWeatherData(currentResponse.data.data);
      }
      
      if (forecastResponse.data.success) {
        setForecast(forecastResponse.data.data);
      }
      
      setLastUpdated(new Date());
    } catch (err) {
      console.error('Weather fetch error:', err);
      setError('Failed to fetch weather data. Please try again.');
      
      // Set mock data as fallback
      setWeatherData(getMockWeatherData());
      setForecast(getMockForecast());
    } finally {
      setLoading(false);
    }
  };

  const getMockWeatherData = () => ({
    location: { name: 'Thrissur, Kerala' },
    current: {
      temperature: 28.5,
      feelsLike: 31.2,
      humidity: 75,
      pressure: 1013,
      windSpeed: 12.5,
      windDirection: 240,
      visibility: 10,
      uvIndex: 6,
      condition: 'Partly Cloudy',
      description: 'Partly cloudy with light winds',
      cloudCover: 45
    },
    alerts: [],
    agriculture: {
      soilMoisture: 65,
      recommendations: [
        { type: 'irrigation', message: 'Reduce watering frequency due to high humidity', priority: 'medium' },
        { type: 'pest-control', message: 'Monitor for fungal diseases in high humidity', priority: 'high' }
      ]
    }
  });

  const getMockForecast = () => ({
    forecast: [
      { date: new Date(), temperature: { min: 24, max: 32 }, humidity: 75, precipitation: { probability: 40, amount: 5 }, condition: 'Partly Cloudy' },
      { date: new Date(Date.now() + 86400000), temperature: { min: 23, max: 31 }, humidity: 80, precipitation: { probability: 60, amount: 12 }, condition: 'Light Rain' },
      { date: new Date(Date.now() + 172800000), temperature: { min: 22, max: 30 }, humidity: 85, precipitation: { probability: 80, amount: 25 }, condition: 'Heavy Rain' },
      { date: new Date(Date.now() + 259200000), temperature: { min: 23, max: 29 }, humidity: 78, precipitation: { probability: 50, amount: 8 }, condition: 'Cloudy' },
      { date: new Date(Date.now() + 345600000), temperature: { min: 24, max: 31 }, humidity: 70, precipitation: { probability: 20, amount: 2 }, condition: 'Sunny' },
      { date: new Date(Date.now() + 432000000), temperature: { min: 24, max: 32 }, humidity: 68, precipitation: { probability: 10, amount: 0 }, condition: 'Clear' },
      { date: new Date(Date.now() + 518400000), temperature: { min: 25, max: 33 }, humidity: 65, precipitation: { probability: 15, amount: 1 }, condition: 'Sunny' }
    ]
  });

  const getWindDirection = (degrees) => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.round(degrees / 45) % 8;
    return directions[index];
  };

  const getWeatherIcon = (condition) => {
    const icons = {
      'Clear': '☀️',
      'Sunny': '☀️',
      'Partly Cloudy': '⛅',
      'Cloudy': '☁️',
      'Light Rain': '🌦️',
      'Heavy Rain': '🌧️',
      'Thunderstorm': '⛈️',
      'Fog': '🌫️'
    };
    return icons[condition] || '🌤️';
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleFont: { size: 14 },
        bodyFont: { size: 13 },
        padding: 12,
        cornerRadius: 8
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          font: { size: 11 }
        }
      },
      y: {
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        },
        ticks: {
          font: { size: 11 }
        }
      }
    }
  };

  const temperatureChartData = forecast ? {
    labels: forecast.forecast.map(day => 
      new Date(day.date).toLocaleDateString('en', { weekday: 'short' })
    ),
    datasets: [
      {
        label: 'Max Temperature (°C)',
        data: forecast.forecast.map(day => day.temperature.max),
        borderColor: '#ef4444',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        tension: 0.3,
        fill: true
      },
      {
        label: 'Min Temperature (°C)',
        data: forecast.forecast.map(day => day.temperature.min),
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.3,
        fill: true
      }
    ]
  } : null;

  const rainChartData = forecast ? {
    labels: forecast.forecast.map(day => 
      new Date(day.date).toLocaleDateString('en', { weekday: 'short' })
    ),
    datasets: [
      {
        label: 'Rain Probability (%)',
        data: forecast.forecast.map(day => day.precipitation.probability),
        backgroundColor: 'rgba(59, 130, 246, 0.6)',
        borderColor: '#3b82f6',
        borderWidth: 2
      }
    ]
  } : null;

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          {translate('weather', 'Weather')} Dashboard
        </h1>
        <div className="flex justify-center items-center h-64">
          <div className="loading-spinner w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          {translate('weather', 'Weather')} Dashboard
        </h1>
        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-500">
            <FaClock className="inline mr-1" />
            {lastUpdated && `Updated: ${lastUpdated.toLocaleTimeString()}`}
          </div>
          <button 
            onClick={fetchWeatherData}
            className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center gap-2"
          >
            <FaSync className={loading ? 'animate-spin' : ''} />
            Refresh
          </button>
        </div>
      </div>

      {/* Location Info */}
      <div className="bg-white rounded-xl shadow-lg p-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-primary-600" />
            <span className="font-semibold">{weatherData?.location?.name || 'Thrissur, Kerala'}</span>
          </div>
          <div className="text-sm text-gray-500">
            Lat: {location.lat.toFixed(4)}, Lon: {location.lon.toFixed(4)}
          </div>
        </div>
      </div>

      {/* Weather Alerts */}
      {weatherData?.alerts && weatherData.alerts.length > 0 && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 rounded-lg">
          <div className="flex items-start">
            <FaExclamationTriangle className="text-yellow-600 mt-1 mr-3" />
            <div>
              <h3 className="font-semibold text-yellow-800">{weatherData.alerts[0].title}</h3>
              <p className="text-yellow-700 text-sm mt-1">{weatherData.alerts[0].description}</p>
            </div>
          </div>
        </div>
      )}

      {/* Tab Navigation */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setSelectedTab('current')}
          className={`px-6 py-2 rounded-lg font-medium transition-colors ${
            selectedTab === 'current' 
              ? 'bg-primary-600 text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Current Weather
        </button>
        <button
          onClick={() => setSelectedTab('forecast')}
          className={`px-6 py-2 rounded-lg font-medium transition-colors ${
            selectedTab === 'forecast' 
              ? 'bg-primary-600 text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          7-Day Forecast
        </button>
        <button
          onClick={() => setSelectedTab('agriculture')}
          className={`px-6 py-2 rounded-lg font-medium transition-colors ${
            selectedTab === 'agriculture' 
              ? 'bg-primary-600 text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Agriculture Insights
        </button>
      </div>

      {/* Current Weather Tab */}
      {selectedTab === 'current' && weatherData && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Weather Card */}
          <div className="lg:col-span-2 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl shadow-lg p-8">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h2 className="text-5xl font-bold mb-2">
                  {Math.round(weatherData.current.temperature)}°C
                </h2>
                <p className="text-xl opacity-90">
                  Feels like {Math.round(weatherData.current.feelsLike)}°C
                </p>
                <p className="text-lg mt-2">
                  {weatherData.current.description}
                </p>
              </div>
              <div className="text-6xl">
                {getWeatherIcon(weatherData.current.condition)}
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white/20 rounded-lg p-3">
                <FaTint className="mb-2" />
                <p className="text-sm opacity-80">Humidity</p>
                <p className="text-xl font-semibold">{weatherData.current.humidity}%</p>
              </div>
              <div className="bg-white/20 rounded-lg p-3">
                <FaWind className="mb-2" />
                <p className="text-sm opacity-80">Wind Speed</p>
                <p className="text-xl font-semibold">{weatherData.current.windSpeed} km/h</p>
              </div>
              <div className="bg-white/20 rounded-lg p-3">
                <FaCompass className="mb-2" />
                <p className="text-sm opacity-80">Wind Direction</p>
                <p className="text-xl font-semibold">{getWindDirection(weatherData.current.windDirection)}</p>
              </div>
              <div className="bg-white/20 rounded-lg p-3">
                <FaEye className="mb-2" />
                <p className="text-sm opacity-80">Visibility</p>
                <p className="text-xl font-semibold">{weatherData.current.visibility} km</p>
              </div>
            </div>
          </div>

          {/* Additional Info Cards */}
          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <FaThermometerHalf className="text-red-500" />
                Pressure & UV
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Pressure</span>
                  <span className="font-semibold">{weatherData.current.pressure} mb</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">UV Index</span>
                  <span className="font-semibold">{weatherData.current.uvIndex}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Cloud Cover</span>
                  <span className="font-semibold">{weatherData.current.cloudCover}%</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <FaSun className="text-yellow-500" />
                Sun & Moon
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Sunrise</span>
                  <span className="font-semibold">6:30 AM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Sunset</span>
                  <span className="font-semibold">6:45 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Day Length</span>
                  <span className="font-semibold">12h 15m</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Forecast Tab */}
      {selectedTab === 'forecast' && forecast && (
        <div className="space-y-6">
          {/* Temperature Chart */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="font-semibold text-gray-800 mb-4">{translate('temperatureTrend', 'Temperature Trend')}</h3>
            <div className="h-64">
              {temperatureChartData && (
                <Line data={temperatureChartData} options={chartOptions} />
              )}
            </div>
          </div>

          {/* Rain Probability Chart */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="font-semibold text-gray-800 mb-4">{translate('rainProbability', 'Rain Probability')}</h3>
            <div className="h-64">
              {rainChartData && (
                <Bar data={rainChartData} options={chartOptions} />
              )}
            </div>
          </div>

          {/* Daily Forecast Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {forecast.forecast.map((day, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
                <div className="text-center">
                  <p className="font-semibold text-gray-800 mb-2">
                    {new Date(day.date).toLocaleDateString('en', { weekday: 'long', month: 'short', day: 'numeric' })}
                  </p>
                  <div className="text-3xl mb-2">
                    {getWeatherIcon(day.condition)}
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{day.condition}</p>
                  <div className="flex justify-around text-sm">
                    <div>
                      <p className="text-gray-500">{translate('high', 'High')}</p>
                      <p className="font-semibold text-red-600">{Math.round(day.temperature.max)}°C</p>
                    </div>
                    <div>
                      <p className="text-gray-500">{translate('low', 'Low')}</p>
                      <p className="font-semibold text-blue-600">{Math.round(day.temperature.min)}°C</p>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t">
                    <div className="flex items-center justify-center gap-1 text-sm text-gray-600">
                      <FaUmbrella className="text-blue-500" />
                      <span>{day.precipitation.probability}%</span>
                      {day.precipitation.amount > 0 && (
                        <span className="ml-2">{day.precipitation.amount}mm</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Agriculture Tab */}
      {selectedTab === 'agriculture' && weatherData && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Soil & Environment */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="font-semibold text-gray-800 mb-4 text-lg">Soil & Environment</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Soil Moisture</span>
                  <span className="font-semibold">{weatherData.agriculture.soilMoisture}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ width: `${weatherData.agriculture.soilMoisture}%` }}
                  ></div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-sm text-gray-600">Best Time to Water</p>
                  <p className="font-semibold">Early Morning</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-sm text-gray-600">Evaporation Rate</p>
                  <p className="font-semibold">Moderate</p>
                </div>
              </div>
            </div>
          </div>

          {/* Agricultural Recommendations */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="font-semibold text-gray-800 mb-4 text-lg">Recommendations</h3>
            <div className="space-y-3">
              {weatherData.agriculture.recommendations.map((rec, index) => (
                <div 
                  key={index} 
                  className={`p-4 rounded-lg border-l-4 ${
                    rec.priority === 'high' 
                      ? 'bg-red-50 border-red-500' 
                      : rec.priority === 'medium'
                      ? 'bg-yellow-50 border-yellow-500'
                      : 'bg-green-50 border-green-500'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      {rec.type === 'irrigation' && <FaTint className="text-blue-600" />}
                      {rec.type === 'pest-control' && <FaExclamationTriangle className="text-yellow-600" />}
                    </div>
                    <div>
                      <p className="font-medium text-gray-800 capitalize">{rec.type.replace('-', ' ')}</p>
                      <p className="text-sm text-gray-600 mt-1">{rec.message}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Weather-Based Farming Tips */}
          <div className="lg:col-span-2 bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-6">
            <h3 className="font-semibold text-gray-800 mb-4 text-lg">Weather-Based Farming Activities</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-4">
                <h4 className="font-medium text-green-700 mb-2">✅ Good for Today</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Fertilizer application</li>
                  <li>• Weeding activities</li>
                  <li>• Soil preparation</li>
                </ul>
              </div>
              <div className="bg-white rounded-lg p-4">
                <h4 className="font-medium text-yellow-700 mb-2">⚠️ Proceed with Caution</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Pesticide spraying</li>
                  <li>• Harvesting</li>
                  <li>• Transplanting</li>
                </ul>
              </div>
              <div className="bg-white rounded-lg p-4">
                <h4 className="font-medium text-red-700 mb-2">❌ Avoid Today</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Heavy irrigation</li>
                  <li>• Seed sowing in open</li>
                  <li>• Chemical applications</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherPage;
