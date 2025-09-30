import React from 'react';
import { FaCheckCircle, FaPlus, FaMinus, FaLeaf } from 'react-icons/fa';

const InputPanel = ({ selectedLocation, farmArea, setFarmArea, onAnalyze, isLoading }) => {
  const handleIncrement = () => {
    setFarmArea(prev => Math.min(prev + 0.5, 100));
  };

  const handleDecrement = () => {
    setFarmArea(prev => Math.max(prev - 0.5, 0.5));
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
      <div className="text-center">
        <div className="text-4xl mb-2">🌾</div>
        <h2 className="text-xl font-bold text-gray-800 mb-1">Farm Analysis</h2>
        <p className="text-sm text-gray-600">കൃഷിഭൂമി വിശകലനം</p>
      </div>

      {/* Location Status */}
      <div className="border-2 border-dashed border-gray-200 rounded-lg p-4">
        {!selectedLocation ? (
          <div className="text-center text-gray-500">
            <div className="text-2xl mb-2">📍</div>
            <p className="text-sm font-medium">Click on the map to select your farm location</p>
            <p className="text-xs text-gray-400 mt-1">നിങ്ങളുടെ കൃഷിഭൂമിയുടെ സ്ഥാനം തിരഞ്ഞെടുക്കുക</p>
          </div>
        ) : (
          <div className="text-center text-green-600 slide-in">
            <FaCheckCircle className="text-2xl mx-auto mb-2" />
            <p className="text-sm font-semibold">Location Selected</p>
            <p className="text-xs text-gray-600">
              Lat: {selectedLocation.lat.toFixed(4)}, Lng: {selectedLocation.lng.toFixed(4)}
            </p>
          </div>
        )}
      </div>

      {/* Farm Area Input */}
      {selectedLocation && (
        <div className="slide-in">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Farm Area (Acres) / ഭൂമിയുടെ വിസ്തൃതി (ഏക്കർ)
          </label>
          <div className="flex items-center space-x-3">
            <button
              onClick={handleDecrement}
              className="bg-gray-100 hover:bg-gray-200 p-2 rounded-lg transition-colors"
              disabled={farmArea <= 0.5}
            >
              <FaMinus className="text-gray-600" />
            </button>
            
            <div className="flex-1 text-center">
              <div className="bg-primary-50 border-2 border-primary-200 rounded-lg px-4 py-3">
                <span className="text-2xl font-bold text-primary-600">{farmArea}</span>
                <span className="text-sm text-gray-600 ml-1">acres</span>
              </div>
            </div>
            
            <button
              onClick={handleIncrement}
              className="bg-gray-100 hover:bg-gray-200 p-2 rounded-lg transition-colors"
              disabled={farmArea >= 100}
            >
              <FaPlus className="text-gray-600" />
            </button>
          </div>
        </div>
      )}

      {/* Analyze Button */}
      {selectedLocation && (
        <div className="slide-in">
          <button
            onClick={onAnalyze}
            disabled={isLoading}
            className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-300 ${
              isLoading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-primary-600 hover:bg-primary-700 hover:shadow-lg transform hover:scale-105'
            }`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="loading-spinner w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
                <span>Analyzing Farm...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center space-x-2">
                <FaLeaf />
                <span>Analyze My Farm</span>
              </div>
            )}
          </button>
          <p className="text-xs text-gray-500 text-center mt-2">
            This may take a few seconds / ഇത് കുറച്ച് സമയമെടുത്തേക്കാം
          </p>
        </div>
      )}
    </div>
  );
};

export default InputPanel;