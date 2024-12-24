import React, { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { MapPin } from 'lucide-react';
import LocationSearch from './components/LocationSearch';
import WeatherDisplay from './components/WeatherDisplay';
import { getWeather, type WeatherData } from './lib/weather';

interface Location {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  season: string;
}

function App() {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  const handleLocationSelect = async (location: Location) => {
    setSelectedLocation(location);
    try {
      const weather = await getWeather(location.latitude, location.longitude);
      setWeatherData(weather);
    } catch (error) {
      toast.error('Failed to fetch weather data. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Toaster position="top-right" />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <MapPin className="w-8 h-8 text-blue-500 mr-2" />
            <h1 className="text-3xl font-bold text-gray-800">
              Weather & Travel Season Advisor
            </h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover the perfect time to visit locations across Kenya with real-time weather updates
            and travel season insights.
          </p>
        </div>

        <div className="flex flex-col items-center space-y-8">
          <LocationSearch onLocationSelect={handleLocationSelect} />

          {selectedLocation && weatherData && (
            <WeatherDisplay
              weather={weatherData}
              location={{
                name: selectedLocation.name,
                season: selectedLocation.season
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;