
import React, { useState, useEffect } from 'react';
import LocationInput from '../components/LocationInput';
import WeatherDisplay from '../components/WeatherDisplay';
import ForecastSection from '../components/ForecastSection';
import ErrorHandler from '../components/ErrorHandler';
import Loader from '../components/Loader';
import { getCurrentWeather, getWeatherForecast } from '../services/weatherService';

interface WeatherData {
  location: string;
  temperature: number;
  description: string;
  humidity: number;
  windSpeed: number;
  feelsLike: number;
  condition: string;
}

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

const Index = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastDay[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getBackgroundClass = (condition?: string) => {
    if (!condition) return 'bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600';
    
    const cond = condition.toLowerCase();
    if (cond.includes('clear') || cond.includes('sun')) {
      return 'bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500';
    } else if (cond.includes('rain') || cond.includes('drizzle')) {
      return 'bg-gradient-to-br from-gray-500 via-gray-600 to-blue-700';
    } else if (cond.includes('snow')) {
      return 'bg-gradient-to-br from-blue-200 via-blue-300 to-blue-500';
    } else if (cond.includes('cloud')) {
      return 'bg-gradient-to-br from-gray-400 via-gray-500 to-gray-600';
    } else {
      return 'bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600';
    }
  };

  const handleLocationSearch = async (location: string) => {
    setIsLoading(true);
    setError(null);

    try {
      console.log('Searching weather for:', location);
      const [weatherData, forecastData] = await Promise.all([
        getCurrentWeather(location),
        getWeatherForecast(location)
      ]);

      console.log('Weather data received:', weatherData);
      console.log('Forecast data received:', forecastData);

      setWeather(weatherData);
      setForecast(forecastData);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      console.error('Weather fetch error:', errorMessage);
      setError(errorMessage);
      setWeather(null);
      setForecast([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetry = () => {
    if (weather?.location) {
      handleLocationSearch(weather.location.split(',')[0]);
    }
  };

  // Load default weather on component mount
  useEffect(() => {
    handleLocationSearch('New York');
  }, []);

  return (
    <div className={`min-h-screen transition-all duration-1000 ${getBackgroundClass(weather?.condition)}`}>
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-4 drop-shadow-2xl">
            Weather App
          </h1>
          <p className="text-xl text-white/90 drop-shadow-lg">
            Get real-time weather updates for any location
          </p>
          <div className="mt-4 p-4 bg-yellow-500/20 backdrop-blur-sm rounded-xl border border-yellow-300/30">
            <p className="text-white/90 text-sm">
              <strong>Demo Mode:</strong> Replace 'demo' with your OpenWeatherMap API key in weatherService.ts
            </p>
          </div>
        </div>

        <LocationInput onLocationSearch={handleLocationSearch} isLoading={isLoading} />

        <div className="max-w-4xl mx-auto">
          {isLoading && <Loader />}
          
          {error && !isLoading && (
            <ErrorHandler error={error} onRetry={handleRetry} />
          )}

          {weather && !isLoading && !error && (
            <div className="space-y-8">
              <WeatherDisplay weather={weather} />
              {forecast.length > 0 && <ForecastSection forecast={forecast} />}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
