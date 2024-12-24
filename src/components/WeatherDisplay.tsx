import React from 'react';
import { Cloud, Sun, CloudRain, Thermometer, Wind, Droplets } from 'lucide-react';
import type { WeatherData } from '../lib/types';

interface WeatherDisplayProps {
  weather: WeatherData;
  location: {
    name: string;
    season: string;
  };
}

export default function WeatherDisplay({ weather, location }: WeatherDisplayProps) {
  const getWeatherIcon = () => {
    if (weather.precipitation > 50) return <CloudRain className="w-12 h-12 text-blue-500" />;
    if (weather.precipitation > 20) return <Cloud className="w-12 h-12 text-gray-500" />;
    return <Sun className="w-12 h-12 text-yellow-500" />;
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-800">{location.name}</h2>
        {getWeatherIcon()}
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Thermometer className="w-5 h-5 text-red-500" />
          <span className="text-lg">
            Temperature: {weather.temperature}°C
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <CloudRain className="w-5 h-5 text-blue-500" />
          <span className="text-lg">
            Precipitation: {weather.precipitation}%
          </span>
        </div>

        {weather.humidity && (
          <div className="flex items-center space-x-2">
            <Droplets className="w-5 h-5 text-blue-400" />
            <span className="text-lg">
              Humidity: {weather.humidity}%
            </span>
          </div>
        )}

        {weather.windSpeed && (
          <div className="flex items-center space-x-2">
            <Wind className="w-5 h-5 text-gray-500" />
            <span className="text-lg">
              Wind Speed: {weather.windSpeed} m/s
            </span>
          </div>
        )}

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">Travel Season Info</h3>
          <p className="text-blue-700">Best time to visit: {location.season}</p>
        </div>
      </div>
    </div>
  );
}