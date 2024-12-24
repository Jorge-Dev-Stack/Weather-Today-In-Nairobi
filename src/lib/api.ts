import axios from 'axios';
import type { WeatherData } from './types';

export const api = axios.create({
  baseURL: 'https://api.tomorrow.io/v4',
  params: {
    apikey: 'kpIP9xPXbabxtG5sDJI1QOu6iN8vCGsz',
    units: 'metric'
  }
});

// Add request interceptor for debugging
api.interceptors.request.use(request => {
  console.log('API Request:', request.url, request.params);
  return request;
});

// Add response interceptor for debugging
api.interceptors.response.use(
  response => {
    console.log('API Response:', response.data);
    return response;
  },
  error => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);