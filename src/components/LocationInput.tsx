
import React, { useState } from 'react';
import { Search, MapPin } from 'lucide-react';

interface LocationInputProps {
  onLocationSearch: (location: string) => void;
  isLoading: boolean;
}

const LocationInput: React.FC<LocationInputProps> = ({ onLocationSearch, isLoading }) => {
  const [location, setLocation] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (location.trim()) {
      onLocationSearch(location.trim());
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          onLocationSearch(`${latitude},${longitude}`);
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mb-8">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter city name..."
            className="w-full px-4 py-3 pl-12 pr-16 text-gray-800 bg-white/90 backdrop-blur-sm rounded-xl border border-white/30 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent transition-all duration-300"
            disabled={isLoading}
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
        </div>
        <button
          type="button"
          onClick={getCurrentLocation}
          className="absolute right-12 top-1/2 transform -translate-y-1/2 text-blue-600 hover:text-blue-700 transition-colors duration-200"
          disabled={isLoading}
        >
          <MapPin className="w-5 h-5" />
        </button>
        <button
          type="submit"
          disabled={isLoading || !location.trim()}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        >
          {isLoading ? '...' : 'Go'}
        </button>
      </form>
    </div>
  );
};

export default LocationInput;
