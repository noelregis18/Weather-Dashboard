
import React, { useEffect } from 'react';
import { useWeather } from '@/hooks/useWeather';
import CitySearch from './CitySearch';
import CurrentWeather from './CurrentWeather';
import WeatherForecast from './WeatherForecast';
import FavoriteCities from './FavoriteCities';
import ThemeToggle from './ThemeToggle';
import Footer from './Footer';
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
    <div className="min-h-screen flex flex-col dark:bg-gray-900 transition-colors duration-200">
      <div className="w-full max-w-6xl mx-auto p-4 space-y-6 flex-grow">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Cloud className="h-8 w-8 md:h-10 md:w-10 text-weather-blue mr-2" />
            <h1 className="text-2xl md:text-3xl font-bold text-weather-blue">Weather Dashboard</h1>
          </div>
          <ThemeToggle />
        </div>
        
        <CitySearch 
          onSearch={searchCity} 
          onGetLocation={getLocationWeather} 
        />
        
        {error ? (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-300 rounded-lg p-4 text-center">
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
      </div>
      
      <Footer />
    </div>
  );
};

export default WeatherDashboard;
