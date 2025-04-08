
import React, { useEffect } from 'react';
import { useWeather } from '@/hooks/useWeather';
import CitySearch from './CitySearch';
import CurrentWeather from './CurrentWeather';
import WeatherForecast from './WeatherForecast';
import FavoriteCities from './FavoriteCities';
import { Cloud } from 'lucide-react';

const WeatherDashboard: React.FC = () => {
  const {
    weatherData,
    forecastData,
    isLoading,
    error,
    city,
    searchCity,
    getLocationWeather,
    favoriteCities,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
  } = useWeather();

  // Try to get location weather on first load
  useEffect(() => {
    if (!city) {
      getLocationWeather();
    }
  }, []);

  const handleToggleFavorite = () => {
    if (!weatherData) return;
    
    if (isFavorite(weatherData.name)) {
      removeFromFavorites(weatherData.name);
    } else {
      addToFavorites(weatherData.name);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 space-y-6">
      <div className="flex items-center justify-center mb-8">
        <Cloud className="h-10 w-10 text-weather-blue mr-2" />
        <h1 className="text-3xl font-bold text-center text-weather-blue">Weather Dashboard</h1>
      </div>
      
      <CitySearch 
        onSearch={searchCity} 
        onGetLocation={getLocationWeather} 
      />
      
      {error ? (
        <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-4 text-center">
          Error: {error instanceof Error ? error.message : 'Failed to load weather data'}
        </div>
      ) : (
        <>
          <CurrentWeather 
            data={weatherData} 
            isLoading={isLoading} 
            isFavorite={weatherData ? isFavorite(weatherData.name) : false}
            onToggleFavorite={handleToggleFavorite}
          />
          
          {(weatherData || isLoading) && (
            <WeatherForecast 
              data={forecastData} 
              isLoading={isLoading} 
            />
          )}
          
          <FavoriteCities 
            cities={favoriteCities} 
            onSelect={searchCity}
            onRemove={removeFromFavorites}
          />
        </>
      )}
      
      <footer className="text-center text-sm text-muted-foreground mt-8 pt-4 border-t">
        <p>Developed by Noel Regis</p>
      </footer>
    </div>
  );
};

export default WeatherDashboard;
