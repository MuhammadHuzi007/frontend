import { useEffect, useState } from 'react';
import { getCurrentWeather } from '../services/weatherApi';
import { toast } from 'react-toastify';
import WeatherCard from '../components/weather/WeatherCard';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import { useAppContext } from '../context/AppContext';
import '../styles/global.css'; // Fixed path

function Favorites() {
  const { favorites } = useAppContext();
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (favorites.length === 0) {
      setLoading(false);
      return;
    }
    setLoading(true);
    Promise.all(favorites.map((city) => getCurrentWeather(city)))
      .then((data) => {
        setWeatherData(data);
        setError(null);
      })
      .catch(() => {
        setError('Error fetching favorites');
        toast.error('Error fetching favorites');
      })
      .finally(() => setLoading(false));
  }, [favorites]);

  return (
    <div className="favorites-page">
      <h1>Your Favorite Cities</h1>
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <ErrorMessage message={error} />
      ) : favorites.length === 0 ? (
        <p>No favorites added yet.</p>
      ) : (
        <div className="weather-grid">
          {weatherData.map((weather) => (
            <WeatherCard key={weather.city} weather={weather} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;