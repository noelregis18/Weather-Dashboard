
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';

// OpenWeather API key - normally would be in env vars
const API_KEY = 'eb4cf8b1b1904d1b9507155b62b38b30';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// Types
export type WeatherData = {
  name: string;
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
    deg: number;
  };
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  coord: {
    lat: number;
    lon: number;
  };
};

export type ForecastData = {
  list: Array<{
    dt: number;
    main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      pressure: number;
      humidity: number;
    };
    weather: Array<{
      id: number;
      main: string;
      description: string;
      icon: string;
    }>;
    wind: {
      speed: number;
      deg: number;
    };
    dt_txt: string;
  }>;
  city: {
    name: string;
    country: string;
    sunrise: number;
    sunset: number;
  };
};

// Get current weather by city name
const fetchWeatherByCity = async (city: string): Promise<WeatherData> => {
  const response = await fetch(
    `${BASE_URL}/weather?q=${city}&appid=${API_KEY}`
  );
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to fetch weather data');
  }
  
  return response.json();
};

// Get forecast by city name
const fetchForecastByCity = async (city: string): Promise<ForecastData> => {
  const response = await fetch(
    `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}`
  );
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to fetch forecast data');
  }
  
  return response.json();
};

// Get weather by coordinates
const fetchWeatherByCoords = async (lat: number, lon: number): Promise<WeatherData> => {
  const response = await fetch(
    `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
  );
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to fetch weather data');
  }
  
  return response.json();
};

// Get forecast by coordinates
const fetchForecastByCoords = async (lat: number, lon: number): Promise<ForecastData> => {
  const response = await fetch(
    `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`
  );
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to fetch forecast data');
  }
  
  return response.json();
};

// Favorite cities handling
const FAVORITES_KEY = 'weatherApp_favoriteCities';

const getFavoriteCities = (): string[] => {
  const stored = localStorage.getItem(FAVORITES_KEY);
  return stored ? JSON.parse(stored) : [];
};

const saveFavoriteCities = (cities: string[]) => {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(cities));
};

export function useWeather() {
  const [city, setCity] = useState<string>('');
  const [favoriteCities, setFavoriteCities] = useState<string[]>(getFavoriteCities);
  
  // Current weather query
  const {
    data: weatherData,
    isLoading: isLoadingWeather,
    error: weatherError,
    refetch: refetchWeather
  } = useQuery({
    queryKey: ['weather', city],
    queryFn: () => fetchWeatherByCity(city),
    enabled: Boolean(city),
    staleTime: 1000 * 60 * 10, // 10 minutes
  });

  // Forecast query
  const {
    data: forecastData,
    isLoading: isLoadingForecast,
    error: forecastError,
    refetch: refetchForecast
  } = useQuery({
    queryKey: ['forecast', city],
    queryFn: () => fetchForecastByCity(city),
    enabled: Boolean(city),
    staleTime: 1000 * 60 * 10, // 10 minutes
  });

  // Search for a city
  const searchCity = (cityName: string) => {
    setCity(cityName);
  };

  // Get weather for user's current location
  const getLocationWeather = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          
          try {
            const weatherResponse = await fetchWeatherByCoords(latitude, longitude);
            setCity(weatherResponse.name);
          } catch (error) {
            toast.error('Could not get weather for your location');
            console.error('Location weather error:', error);
          }
        },
        (error) => {
          toast.error('Location access denied. Please search for a city.');
          console.error('Geolocation error:', error);
        }
      );
    } else {
      toast.error('Geolocation is not supported by your browser');
    }
  };

  // Handle favorite cities
  const addToFavorites = (cityName: string) => {
    if (!cityName) return;
    
    const newFavorites = [...favoriteCities];
    if (!newFavorites.includes(cityName)) {
      newFavorites.push(cityName);
      setFavoriteCities(newFavorites);
      saveFavoriteCities(newFavorites);
      toast.success(`Added ${cityName} to favorites`);
    }
  };

  const removeFromFavorites = (cityName: string) => {
    const newFavorites = favoriteCities.filter(c => c !== cityName);
    setFavoriteCities(newFavorites);
    saveFavoriteCities(newFavorites);
    toast.success(`Removed ${cityName} from favorites`);
  };

  const isFavorite = (cityName: string) => {
    return favoriteCities.includes(cityName);
  };

  return {
    weatherData,
    forecastData,
    isLoading: isLoadingWeather || isLoadingForecast,
    error: weatherError || forecastError,
    city,
    searchCity,
    getLocationWeather,
    favoriteCities,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
  };
}
