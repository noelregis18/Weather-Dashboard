
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { ForecastData } from '@/hooks/useWeather';
import { kelvinToCelsius, formatDate } from '@/utils/weatherUtils';
import { getWeatherIcon } from '@/lib/weatherIcons';

type WeatherForecastProps = {
  data: ForecastData | undefined;
  isLoading: boolean;
};

const WeatherForecast: React.FC<WeatherForecastProps> = ({ data, isLoading }) => {
  if (isLoading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>
            <Skeleton className="h-6 w-32" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[...Array(5)].map((_, index) => (
              <Skeleton key={index} className="h-32 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!data) {
    return null;
  }

  // Group forecast data by day
  const dailyForecasts = data.list.reduce<Record<string, typeof data.list[0]>>((acc, forecast) => {
    const date = forecast.dt_txt.split(' ')[0];
    // For each day, we'll take the forecast for noon (or the closest time to it)
    const existingForecast = acc[date];
    
    if (!existingForecast) {
      acc[date] = forecast;
    } else {
      // Prefer the midday forecast (around 12:00)
      const existingHour = parseInt(existingForecast.dt_txt.split(' ')[1].split(':')[0]);
      const newHour = parseInt(forecast.dt_txt.split(' ')[1].split(':')[0]);
      
      if (Math.abs(12 - newHour) < Math.abs(12 - existingHour)) {
        acc[date] = forecast;
      }
    }
    
    return acc;
  }, {});

  // Convert to array and sort by date
  const sortedDailyForecasts = Object.values(dailyForecasts)
    .sort((a, b) => a.dt - b.dt)
    .slice(0, 5); // Get next 5 days

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl text-weather-blue">5-Day Forecast</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {sortedDailyForecasts.map((forecast) => {
            const weatherCondition = getWeatherIcon(forecast.weather[0].icon);
            const WeatherIcon = weatherCondition.icon;
            
            return (
              <div
                key={forecast.dt}
                className="flex flex-col items-center p-3 bg-weather-cloud-light rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="font-medium">{formatDate(forecast.dt)}</div>
                <WeatherIcon className={`h-10 w-10 my-2 ${weatherCondition.color}`} />
                <div className="text-sm text-gray-600">{forecast.weather[0].description}</div>
                <div className="mt-2 font-bold text-lg">
                  {kelvinToCelsius(forecast.main.temp)}°C
                </div>
                <div className="text-xs text-gray-500">
                  {kelvinToCelsius(forecast.main.temp_min)}° / {kelvinToCelsius(forecast.main.temp_max)}°
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherForecast;
