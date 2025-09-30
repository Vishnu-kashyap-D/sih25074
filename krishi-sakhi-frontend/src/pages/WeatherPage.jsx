import React from 'react';
import { FaCloudSun, FaUmbrella, FaTint, FaWind } from 'react-icons/fa';

const WeatherPage = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Weather Dashboard
        <span className="text-lg text-gray-500 ml-2">(കാലാവസ്ഥ)</span>
      </h1>

      {/* Placeholder Content */}
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-lg p-12 text-center">
        <FaCloudSun size={80} className="text-blue-600 mx-auto mb-6" />
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Weather Dashboard Coming Soon!
        </h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          We're building a comprehensive weather dashboard with real-time data, forecasts,
          and agricultural advice based on weather conditions. Stay tuned!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-8">
          <div className="bg-white rounded-lg p-6 shadow-md">
            <FaUmbrella className="text-blue-600 mx-auto mb-3" size={40} />
            <h3 className="font-semibold text-lg mb-2">Rainfall Forecast</h3>
            <p className="text-gray-600 text-sm">
              7-day rainfall predictions for your farm
            </p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-md">
            <FaTint className="text-blue-600 mx-auto mb-3" size={40} />
            <h3 className="font-semibold text-lg mb-2">Humidity Levels</h3>
            <p className="text-gray-600 text-sm">
              Track humidity for pest and disease management
            </p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-md">
            <FaWind className="text-blue-600 mx-auto mb-3" size={40} />
            <h3 className="font-semibold text-lg mb-2">Wind Patterns</h3>
            <p className="text-gray-600 text-sm">
              Plan spraying and irrigation activities
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherPage;