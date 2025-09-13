import api from './api';
import { toast } from 'react-toastify';

// Fetch current weather for a city
export const getCurrentWeather = async (city, country = '') => {
  try {
    const response = await api.get(`/weather/current/${city}`, {
      params: { country },
    });
    return response.data;
  } catch (error) {
    toast.error(`Error fetching weather for ${city}: ${error.message}`);
    throw error;
  }
};

// Fetch 5-day forecast for a city
export const getForecast = async (city, country = '') => {
  try {
    const response = await api.get(`/weather/forecast/${city}`, {
      params: { country },
    });
    return response.data;
  } catch (error) {
    toast.error(`Error fetching forecast for ${city}: ${error.message}`);
    throw error;
  }
};

// Search cities for autocomplete
export const searchCities = async (query, country = '') => {
  try {
    const response = await api.get('/search/cities', {
      params: { query, country },
    });
    return response.data;
  } catch (error) {
    toast.error(`Error searching cities: ${error.message}`);
    throw error;
  }
};