import api from './api';
import { toast } from 'react-toastify';

// Fetch timezone data for a specific city
export const getTimezone = async (city) => {
  try {
    const response = await api.get(`/timezone/${city}`);
    return response.data; // { city, timezone, offset, dst, ... }
  } catch (error) {
    toast.error(`Error fetching timezone for ${city}: ${error.message}`);
    throw error;
  }
};

// Fetch world timezones (optionally filtered by continent)
export const getWorldTimezones = async (continent = '') => {
  try {
    const response = await api.get('/timezone/world', {
      params: { continent },
    });
    return response.data; // [{ city, timezone, offset, ... }, ...]
  } catch (error) {
    toast.error(`Error fetching world timezones: ${error.message}`);
    throw error;
  }
};