import axios from 'axios';
import { api } from './api';
import type { WeatherData } from './types';

// Add rate limiting and caching
const cache = new Map<string, { data: WeatherData; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export async function getWeather(latitude: number, longitude: number): Promise<WeatherData> {
  const cacheKey = `${latitude},${longitude}`;
  const cached = cache.get(cacheKey);
  
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }

  try {
    const response = await api.get('/weather/forecast', {
      params: {
        location: `${latitude},${longitude}`,
        fields: ['temperature', 'precipitationProbability', 'weatherCode', 'humidity', 'windSpeed'],
        timesteps: '1h'
      }
    });

    if (!response.data?.timelines?.hourly?.[0]) {
      throw new Error('Invalid weather data format received');
    }

    const timeline = response.data.timelines.hourly[0];
    const weatherData: WeatherData = {
      temperature: timeline.values.temperature || 0,
      precipitation: timeline.values.precipitationProbability || 0,
      conditions: timeline.values.weatherCode || 'unknown',
      humidity: timeline.values.humidity || 0,
      windSpeed: timeline.values.windSpeed || 0
    };

    // Cache the result
    cache.set(cacheKey, {
      data: weatherData,
      timestamp: Date.now()
    });

    return weatherData;
  } catch (error) {
    console.error('Weather fetch error:', error);
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 429) {
        throw new Error('Weather API rate limit exceeded. Please try again later.');
      }
      throw new Error(`Weather API error: ${error.response?.data?.message || error.message}`);
    }
    throw new Error('Failed to fetch weather data');
  }
}