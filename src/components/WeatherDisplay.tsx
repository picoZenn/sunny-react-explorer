
import React from 'react';
import { Cloud, CloudRain, Sun, CloudSnow, Wind, Thermometer } from 'lucide-react';

interface WeatherData {
  location: string;
  temperature: number;
  description: string;
  humidity: number;
  windSpeed: number;
  feelsLike: number;
  condition: string;
}

interface WeatherDisplayProps {
  weather: WeatherData;
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ weather }) => {
  const getWeatherIcon = (condition: string) => {
    const iconClass = "w-24 h-24 text-white drop-shadow-lg";
    
    if (condition.includes('rain') || condition.includes('drizzle')) {
      return <CloudRain className={iconClass} />;
    } else if (condition.includes('snow')) {
      return <CloudSnow className={iconClass} />;
    } else if (condition.includes('cloud')) {
      return <Cloud className={iconClass} />;
    } else if (condition.includes('clear') || condition.includes('sun')) {
      return <Sun className={iconClass} />;
    } else {
      return <Cloud className={iconClass} />;
    }
  };

  return (
    <div className="bg-white/20 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white/30 mb-8">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">{weather.location}</h2>
        <div className="flex justify-center mb-4">
          {getWeatherIcon(weather.condition.toLowerCase())}
        </div>
        <div className="text-6xl font-bold text-white mb-2">
          {Math.round(weather.temperature)}°C
        </div>
        <p className="text-xl text-white/90 capitalize">{weather.description}</p>
        <p className="text-lg text-white/80 mt-2">
          Feels like {Math.round(weather.feelsLike)}°C
        </p>
      </div>
      
      <div className="grid grid-cols-2 gap-6 mt-8">
        <div className="bg-white/10 rounded-2xl p-4 text-center">
          <div className="flex justify-center mb-2">
            <Wind className="w-6 h-6 text-white" />
          </div>
          <p className="text-white/80 text-sm">Wind Speed</p>
          <p className="text-xl font-semibold text-white">{weather.windSpeed} m/s</p>
        </div>
        <div className="bg-white/10 rounded-2xl p-4 text-center">
          <div className="flex justify-center mb-2">
            <Thermometer className="w-6 h-6 text-white" />
          </div>
          <p className="text-white/80 text-sm">Humidity</p>
          <p className="text-xl font-semibold text-white">{weather.humidity}%</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherDisplay;
