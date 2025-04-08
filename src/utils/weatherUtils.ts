
// Temperature conversions
export const kelvinToCelsius = (kelvin: number): number => {
  return Math.round(kelvin - 273.15);
};

export const kelvinToFahrenheit = (kelvin: number): number => {
  return Math.round((kelvin - 273.15) * 9/5 + 32);
};

// Format date from UNIX timestamp
export const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  }).format(date);
};

// Format time from UNIX timestamp
export const formatTime = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  }).format(date);
};

// Get time of day (day/night) based on current time and sunrise/sunset
export const getTimeOfDay = (
  current: number,
  sunrise: number,
  sunset: number
): 'day' | 'night' => {
  const currentTime = current * 1000;
  const sunriseTime = sunrise * 1000;
  const sunsetTime = sunset * 1000;
  
  return currentTime > sunriseTime && currentTime < sunsetTime 
    ? 'day' 
    : 'night';
};

// Get appropriate background class based on weather condition
export const getWeatherBackground = (iconCode: string): string => {
  // First two characters represent weather condition
  const condition = iconCode.substring(0, 2);
  
  // Map conditions to background classes
  const backgroundMap: Record<string, string> = {
    '01': 'bg-gradient-to-br from-blue-400 to-blue-600', // Clear sky
    '02': 'bg-gradient-to-br from-blue-300 to-blue-500', // Few clouds
    '03': 'bg-gradient-to-br from-blue-200 to-blue-400', // Scattered clouds
    '04': 'bg-gradient-to-br from-gray-300 to-gray-500', // Broken clouds
    '09': 'bg-gradient-to-br from-blue-400 to-blue-700', // Shower rain
    '10': 'bg-gradient-to-br from-blue-500 to-blue-800', // Rain
    '11': 'bg-gradient-to-br from-purple-400 to-purple-800', // Thunderstorm
    '13': 'bg-gradient-to-br from-blue-100 to-blue-300', // Snow
    '50': 'bg-gradient-to-br from-gray-400 to-gray-600', // Mist
  };
  
  return backgroundMap[condition] || 'bg-gradient-to-br from-blue-300 to-blue-600';
};
