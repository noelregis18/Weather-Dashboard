
import React from 'react';
import { Star, Wind, Droplet, Thermometer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { WeatherData } from '@/hooks/useWeather';
import { kelvinToCelsius, formatTime } from '@/utils/weatherUtils';
import { getWeatherIcon } from '@/lib/weatherIcons';

type CurrentWeatherProps = {
  data: WeatherData | undefined;
  isLoading: boolean;
  isFavorite: boolean;
  onToggleFavorite: () => void;
};

const CurrentWeather: React.FC<CurrentWeatherProps> = ({
  data,
  isLoading,
  isFavorite,
  onToggleFavorite,
}) => {
  if (isLoading) {
    return (
      <Card className="w-full">
        <CardContent className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <Skeleton className="h-8 w-40 mb-2" />
              <Skeleton className="h-6 w-24 mb-4" />
            </div>
            <Skeleton className="h-10 w-10 rounded-full" />
          </div>
          <div className="flex items-center justify-center my-6">
            <Skeleton className="h-24 w-24 rounded-full" />
            <Skeleton className="h-16 w-32 ml-4" />
          </div>
          <div className="grid grid-cols-3 gap-4 mt-6">
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!data) {
    return (
      <Card className="w-full">
        <CardContent className="p-6 text-center">
          <p className="text-lg text-muted-foreground">
            Search for a city to see weather information
          </p>
        </CardContent>
      </Card>
    );
  }

  const {
    name,
    sys,
    main,
    weather,
    wind,
  } = data;

  const weatherCondition = getWeatherIcon(weather[0].icon);
  const WeatherIcon = weatherCondition.icon;

  return (
    <Card className="w-full bg-gradient-to-br from-weather-blue-light to-weather-blue overflow-hidden">
      <CardContent className="p-6 text-white">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center">
              <h2 className="text-2xl font-bold">
                {name}, {sys.country}
              </h2>
              <Button
                variant="ghost"
                size="icon"
                className="ml-2 text-yellow-300 hover:text-yellow-500 hover:bg-transparent"
                onClick={onToggleFavorite}
                title={isFavorite ? "Remove from favorites" : "Add to favorites"}
              >
                <Star
                  className={`h-5 w-5 ${isFavorite ? "fill-current" : ""}`}
                />
              </Button>
            </div>
            <p className="text-lg opacity-90">
              {weather[0].description.charAt(0).toUpperCase() + weather[0].description.slice(1)}
            </p>
          </div>
          <div className="text-right text-sm opacity-90">
            <div>Sunrise: {formatTime(sys.sunrise)}</div>
            <div>Sunset: {formatTime(sys.sunset)}</div>
          </div>
        </div>

        <div className="flex items-center justify-center my-8">
          <WeatherIcon className={`h-20 w-20 ${weatherCondition.color}`} />
          <div className="ml-4">
            <div className="text-6xl font-bold">
              {kelvinToCelsius(main.temp)}°C
            </div>
            <div className="text-lg">
              Feels like {kelvinToCelsius(main.feels_like)}°C
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-6 bg-white/10 rounded-lg p-4">
          <div className="flex flex-col items-center">
            <Thermometer className="h-6 w-6 mb-2" />
            <span className="text-sm opacity-75">Min/Max</span>
            <span className="font-medium">
              {kelvinToCelsius(main.temp_min)}° / {kelvinToCelsius(main.temp_max)}°
            </span>
          </div>
          <div className="flex flex-col items-center">
            <Wind className="h-6 w-6 mb-2" />
            <span className="text-sm opacity-75">Wind</span>
            <span className="font-medium">{Math.round(wind.speed * 3.6)} km/h</span>
          </div>
          <div className="flex flex-col items-center">
            <Droplet className="h-6 w-6 mb-2" />
            <span className="text-sm opacity-75">Humidity</span>
            <span className="font-medium">{main.humidity}%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CurrentWeather;
