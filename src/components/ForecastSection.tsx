
import React from 'react';
import { Cloud, CloudRain, Sun, CloudSnow } from 'lucide-react';

interface ForecastDay {
  date: string;
  day: string;
  temperature: {
    max: number;
    min: number;
  };
  condition: string;
  description: string;
}

interface ForecastSectionProps {
  forecast: ForecastDay[];
}

const ForecastSection: React.FC<ForecastSectionProps> = ({ forecast }) => {
  const getWeatherIcon = (condition: string) => {
    const iconClass = "w-8 h-8 text-white";
    
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
    <div className="bg-white/20 backdrop-blur-md rounded-3xl p-6 shadow-2xl border border-white/30">
      <h3 className="text-2xl font-bold text-white mb-6 text-center">5-Day Forecast</h3>
      <div className="space-y-4">
        {forecast.map((day, index) => (
          <div key={index} className="bg-white/10 rounded-2xl p-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex justify-center w-12">
                {getWeatherIcon(day.condition.toLowerCase())}
              </div>
              <div>
                <p className="text-white font-semibold">{day.day}</p>
                <p className="text-white/70 text-sm capitalize">{day.description}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-white font-semibold">
                {Math.round(day.temperature.max)}° / {Math.round(day.temperature.min)}°
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForecastSection;
