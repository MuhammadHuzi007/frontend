import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCurrentWeather, getForecast } from '../services/weatherApi';
import { toast } from 'react-toastify';
import WeatherCard from '../components/weather/WeatherCard';
import ForecastList from '../components/weather/ForecastList';
import LoadingSpinner from '../components/common/LoadingSpinner';
import '../styles/global.css'; // Fixed path

function Weather() {
  const { city } = useParams();
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Promise.all([getCurrentWeather(city), getForecast(city)])
      .then(([currentData, forecastData]) => {
        setWeather(currentData);
        setForecast(forecastData);
      })
      .catch(() => toast.error(`Error fetching data for ${city}`))
      .finally(() => setLoading(false));
  }, [city]);

  return (
    <div className="weather-page">
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          {weather && <WeatherCard weather={weather} />}
          {forecast.length > 0 && <ForecastList forecast={forecast} />}
        </>
      )}
    </div>
  );
}

export default Weather;