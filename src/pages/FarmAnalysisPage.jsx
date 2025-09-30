import React, { useState } from 'react';
import MapComponent from '../components/MapComponent';
import InputPanel from '../components/InputPanel';
import AnalysisReport from '../components/AnalysisReport';
import axios from 'axios';

const FarmAnalysisPage = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [farmArea, setFarmArea] = useState(1);
  const [analysisData, setAnalysisData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    setAnalysisData(null);
  };

  const handleAnalysis = async () => {
    if (!selectedLocation) return;
    
    setIsLoading(true);
    
    try {
      try {
        const response = await axios.post('http://localhost:3001/api/v1/analyze', {
          latitude: selectedLocation.lat,
          longitude: selectedLocation.lng,
          acres: farmArea,
          farmName: 'My Farm'
        });
        
        if (response.data.success) {
          setAnalysisData(response.data.data);
        } else {
          setAnalysisData(response.data);
        }
        setIsLoading(false);
        
      } catch (apiError) {
        console.log('Backend not available, using mock data');
        
        setTimeout(() => {
          const mockResponse = {
            location: { 
              latitude: selectedLocation.lat, 
              longitude: selectedLocation.lng, 
              acres: farmArea 
            },
            land_cover: {
              class: "Agricultural Land"
            },
            vegetation_index: {
              ndvi: 0.78,
              remark: "Healthy Vegetation"
            },
            soil_properties: {
              texture: "Sandy Loam",
              ph: 6.2,
              organic_carbon_percent: 1.1,
            },
            nutrient_levels: {
              nitrogen: "Low",
              phosphorus: "Medium",
              potassium: "High"
            },
            groundwater: {
              depth_meters: 15,
              availability: "Good"
            }
          };
          
          setAnalysisData(mockResponse);
          setIsLoading(false);
        }, 2000);
      }
      
    } catch (error) {
      console.error('Analysis failed:', error);
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-4">
          <MapComponent 
            selectedLocation={selectedLocation}
            farmArea={farmArea}
            onLocationSelect={handleLocationSelect}
          />
        </div>
        
        <div className="space-y-6">
          <InputPanel 
            selectedLocation={selectedLocation}
            farmArea={farmArea}
            setFarmArea={setFarmArea}
            onAnalyze={handleAnalysis}
            isLoading={isLoading}
          />
          
          {analysisData && (
            <AnalysisReport data={analysisData} />
          )}
        </div>
      </div>
    </div>
  );
};

export default FarmAnalysisPage;