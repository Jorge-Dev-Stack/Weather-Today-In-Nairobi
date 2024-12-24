export interface Location {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  season: string;
  created_at?: string;
}

export interface WeatherData {
  temperature: number;
  precipitation: number;
  conditions: string;
  humidity?: number;
  windSpeed?: number;
}