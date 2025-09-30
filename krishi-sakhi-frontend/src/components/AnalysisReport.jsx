import React from 'react';
import ReportCard from './ReportCard';

const AnalysisReport = ({ data }) => {
  const getNutrientColor = (level) => {
    const levelLower = level.toLowerCase();
    if (levelLower === 'high') return 'green';
    if (levelLower === 'medium') return 'yellow';
    if (levelLower === 'low') return 'red';
    return 'primary';
  };

  const getNutrientBar = (level) => {
    const levelLower = level.toLowerCase();
    if (levelLower === 'high') return 'w-full bg-green-500';
    if (levelLower === 'medium') return 'w-2/3 bg-yellow-500';
    if (levelLower === 'low') return 'w-1/3 bg-red-500';
    return 'w-1/2 bg-gray-500';
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 fade-in">
      <div className="text-center mb-6">
        <div className="text-3xl mb-2">📊</div>
        <h2 className="text-xl font-bold text-gray-800">Farm Analysis Report</h2>
      </div>

      <div className="space-y-4">
        {/* Land Cover */}
        <ReportCard
          icon="🌾"
          title="Land Cover"
          value={data.land_cover.class}
          color="green"
        />

        {/* Soil Type */}
        <ReportCard
          icon="🌱"
          title="Soil Type"
          value={data.soil_properties.texture}
          color="primary"
        />

        {/* Vegetation Health */}
        <ReportCard
          icon="🍃"
          title="Vegetation Health"
          value={`${data.vegetation_index.remark} (NDVI: ${data.vegetation_index.ndvi})`}
          color="green"
        />

        {/* Groundwater */}
        <ReportCard
          icon="💧"
          title="Groundwater"
          value={`${data.groundwater.depth_meters}m depth - ${data.groundwater.availability}`}
          color="blue"
        />

        {/* Soil pH */}
        <ReportCard
          icon="⚗️"
          title="Soil pH"
          value={data.soil_properties.ph}
          color="primary"
        />

        {/* Nutrients Section */}
        <div className="mt-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Nutrient Levels</h3>
          
          {/* Nitrogen */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold text-gray-700">Nitrogen</span>
              <span className={`text-sm font-bold ${
                getNutrientColor(data.nutrient_levels.nitrogen) === 'green' ? 'text-green-600' :
                getNutrientColor(data.nutrient_levels.nitrogen) === 'yellow' ? 'text-yellow-600' : 'text-red-600'
              }`}>
                {data.nutrient_levels.nitrogen}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className={`h-2 rounded-full ${getNutrientBar(data.nutrient_levels.nitrogen)}`}></div>
            </div>
          </div>

          {/* Phosphorus */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold text-gray-700">Phosphorus</span>
              <span className={`text-sm font-bold ${
                getNutrientColor(data.nutrient_levels.phosphorus) === 'green' ? 'text-green-600' :
                getNutrientColor(data.nutrient_levels.phosphorus) === 'yellow' ? 'text-yellow-600' : 'text-red-600'
              }`}>
                {data.nutrient_levels.phosphorus}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className={`h-2 rounded-full ${getNutrientBar(data.nutrient_levels.phosphorus)}`}></div>
            </div>
          </div>

          {/* Potassium */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold text-gray-700">Potassium</span>
              <span className={`text-sm font-bold ${
                getNutrientColor(data.nutrient_levels.potassium) === 'green' ? 'text-green-600' :
                getNutrientColor(data.nutrient_levels.potassium) === 'yellow' ? 'text-yellow-600' : 'text-red-600'
              }`}>
                {data.nutrient_levels.potassium}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className={`h-2 rounded-full ${getNutrientBar(data.nutrient_levels.potassium)}`}></div>
            </div>
          </div>
        </div>

        {/* Location Info */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">
            <strong>Location:</strong> {data.location.latitude.toFixed(4)}, {data.location.longitude.toFixed(4)}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Area:</strong> {data.location.acres} acres
          </p>
        </div>
      </div>
    </div>
  );
};

export default AnalysisReport;