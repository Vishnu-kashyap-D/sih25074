import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Circle, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom marker icon
const farmIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,' + btoa(`
    <svg width="25" height="25" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L13.09 8.26L19 7L17.74 13.26L23 15L16.74 16.74L15 23L13.26 16.74L7 19L8.26 12.74L2 11L8.26 9.26L7 3L12.74 4.26L12 2Z" fill="#22c55e" stroke="#15803d" stroke-width="1"/>
    </svg>
  `),
  iconSize: [25, 25],
  iconAnchor: [12, 12],
});

function MapEvents({ onLocationSelect }) {
  useMapEvents({
    click(e) {
      onLocationSelect(e.latlng);
    },
  });
  return null;
}

const MapComponent = ({ selectedLocation, farmArea, onLocationSelect }) => {
  const mapRef = useRef();
  
  // Kerala center coordinates
  const keralaCenter = [10.8505, 76.2711];
  
  // Calculate radius based on acres (rough approximation)
  const acreToRadius = (acres) => {
    const sqMeters = acres * 4047;
    return Math.sqrt(sqMeters / Math.PI);
  };

  return (
    <div className="h-full w-full rounded-xl overflow-hidden">
      <MapContainer
        center={keralaCenter}
        zoom={8}
        style={{ height: '100%', width: '100%' }}
        ref={mapRef}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />
        
        <MapEvents onLocationSelect={onLocationSelect} />
        
        {selectedLocation && (
          <>
            <Marker 
              position={selectedLocation} 
              icon={farmIcon}
            />
            <Circle
              center={selectedLocation}
              radius={acreToRadius(farmArea)}
              pathOptions={{
                color: '#22c55e',
                fillColor: '#22c55e',
                fillOpacity: 0.2,
                weight: 2
              }}
            />
          </>
        )}
      </MapContainer>
      
      {!selectedLocation && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="bg-black bg-opacity-50 text-white px-4 py-2 rounded-lg">
            <p className="text-sm font-medium">🗺️ Click on the map to select your farm location</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapComponent;