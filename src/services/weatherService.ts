
const API_KEY = 'demo'; // Users will need to replace with their OpenWeatherMap API key
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

interface WeatherResponse {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  weather: Array<{
    main: string;
    description: string;
  }>;
  wind: {
    speed: number;
  };
  sys: {
    country: string;
  };
}

interface ForecastResponse {
  list: Array<{
    dt: number;
    main: {
      temp_max: number;
      temp_min: number;
    };
    weather: Array<{
      main: string;
      description: string;
    }>;
  }>;
}

export const getCurrentWeather = async (location: string) => {
  try {
    // Check if location is coordinates
    const isCoordinates = location.includes(',');
    const query = isCoordinates 
      ? `lat=${location.split(',')[0]}&lon=${location.split(',')[1]}`
      : `q=${location}`;

    // For demo purposes, return mock data since we don't have a real API key
    if (API_KEY === 'demo') {
      return getMockWeatherData(location);
    }

    const response = await fetch(
      `${BASE_URL}/weather?${query}&appid=${API_KEY}&units=metric`
    );

    if (!response.ok) {
      throw new Error('Weather data not found. Please check the location name.');
    }

    const data: WeatherResponse = await response.json();

    return {
      location: `${data.name}, ${data.sys.country}`,
      temperature: data.main.temp,
      description: data.weather[0].description,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      feelsLike: data.main.feels_like,
      condition: data.weather[0].main,
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw new Error(error instanceof Error ? error.message : 'Failed to fetch weather data');
  }
};

export const getWeatherForecast = async (location: string) => {
  try {
    // Check if location is coordinates
    const isCoordinates = location.includes(',');
    const query = isCoordinates 
      ? `lat=${location.split(',')[0]}&lon=${location.split(',')[1]}`
      : `q=${location}`;

    // For demo purposes, return mock data since we don't have a real API key
    if (API_KEY === 'demo') {
      return getMockForecastData();
    }

    const response = await fetch(
      `${BASE_URL}/forecast?${query}&appid=${API_KEY}&units=metric`
    );

    if (!response.ok) {
      throw new Error('Forecast data not found. Please check the location name.');
    }

    const data: ForecastResponse = await response.json();

    // Process forecast data to get daily forecasts
    const dailyForecasts = data.list
      .filter((_, index) => index % 8 === 0) // Get one forecast per day (every 8th item = 24 hours)
      .slice(0, 5)
      .map((item) => {
        const date = new Date(item.dt * 1000);
        return {
          date: date.toISOString().split('T')[0],
          day: date.toLocaleDateString('en-US', { weekday: 'long' }),
          temperature: {
            max: item.main.temp_max,
            min: item.main.temp_min,
          },
          condition: item.weather[0].main,
          description: item.weather[0].description,
        };
      });

    return dailyForecasts;
  } catch (error) {
    console.error('Error fetching forecast data:', error);
    throw new Error(error instanceof Error ? error.message : 'Failed to fetch forecast data');
  }
};

// Mock data for demo purposes
const getMockWeatherData = (location: string) => {
  const mockData = {
    location: location.includes(',') ? 'Current Location' : location,
    temperature: 22,
    description: 'partly cloudy',
    humidity: 65,
    windSpeed: 3.2,
    feelsLike: 24,
    condition: 'Clouds',
  };
  
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockData), 1000);
  });
};

const getMockForecastData = () => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const conditions = ['Clear', 'Clouds', 'Rain', 'Clouds', 'Clear'];
  const descriptions = ['clear sky', 'few clouds', 'light rain', 'scattered clouds', 'clear sky'];
  
  const mockForecast = days.map((day, index) => ({
    date: new Date(Date.now() + (index + 1) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    day,
    temperature: {
      max: 20 + Math.random() * 15,
      min: 10 + Math.random() * 10,
    },
    condition: conditions[index],
    description: descriptions[index],
  }));

  return new Promise((resolve) => {
    setTimeout(() => resolve(mockForecast), 1200);
  });
};
