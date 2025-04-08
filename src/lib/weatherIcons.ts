
import {
  Cloud,
  CloudDrizzle,
  CloudFog,
  CloudLightning,
  CloudRain,
  CloudSnow,
  Sun,
  CloudSun,
  Wind,
  type LucideIcon
} from "lucide-react";

type WeatherCondition = {
  icon: LucideIcon;
  label: string;
  color: string;
};

export const weatherConditions: Record<string, WeatherCondition> = {
  "01d": { icon: Sun, label: "Clear sky", color: "text-yellow-500" },
  "01n": { icon: Sun, label: "Clear sky", color: "text-yellow-500" },
  "02d": { icon: CloudSun, label: "Few clouds", color: "text-blue-500" },
  "02n": { icon: CloudSun, label: "Few clouds", color: "text-blue-500" },
  "03d": { icon: Cloud, label: "Scattered clouds", color: "text-gray-500" },
  "03n": { icon: Cloud, label: "Scattered clouds", color: "text-gray-500" },
  "04d": { icon: Cloud, label: "Broken clouds", color: "text-gray-500" },
  "04n": { icon: Cloud, label: "Broken clouds", color: "text-gray-500" },
  "09d": { icon: CloudDrizzle, label: "Shower rain", color: "text-blue-400" },
  "09n": { icon: CloudDrizzle, label: "Shower rain", color: "text-blue-400" },
  "10d": { icon: CloudRain, label: "Rain", color: "text-blue-600" },
  "10n": { icon: CloudRain, label: "Rain", color: "text-blue-600" },
  "11d": { icon: CloudLightning, label: "Thunderstorm", color: "text-purple-500" },
  "11n": { icon: CloudLightning, label: "Thunderstorm", color: "text-purple-500" },
  "13d": { icon: CloudSnow, label: "Snow", color: "text-blue-200" },
  "13n": { icon: CloudSnow, label: "Snow", color: "text-blue-200" },
  "50d": { icon: CloudFog, label: "Mist", color: "text-gray-400" },
  "50n": { icon: CloudFog, label: "Mist", color: "text-gray-400" },
  "default": { icon: Sun, label: "Unknown", color: "text-gray-500" }
};

export function getWeatherIcon(iconCode: string): WeatherCondition {
  return weatherConditions[iconCode] || weatherConditions.default;
}
