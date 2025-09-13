import { useState } from 'react';
import { getCurrentWeather } from '../services/weatherApi';
import { getTimezone } from '../services/TimezoneApi'; // Fixed import
import { toast } from 'react-toastify';
import SearchBar from '../components/search/SearchBar';
import WeatherCard from '../components/weather/WeatherCard';
import TimezoneClock from '../components/timezone/TimezoneClock';
import LoadingSpinner from '../components/common/LoadingSpinner';
import '../styles/compare.css'; // Fixed path
import '../styles/global.css'; // Fixed path


function Compare() {
  const [cities, setCities] = useState([]);
  const [weatherData, setWeatherData] = useState([]);
  const [timezoneData, setTimezoneData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = async (city) => {
    if (!city || cities.includes(city)) return;
    setLoading(true);
    try {
      const [weather, timezone] = await Promise.all([
        getCurrentWeather(city),
        getTimezone(city),
      ]);
      setCities([...cities, city]);
      setWeatherData([...weatherData, weather]);
      setTimezoneData([...timezoneData, timezone]);
      setSearchQuery('');
    } catch (error) {
      toast.error(`Error fetching data for ${city}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="compare-page">
      <h1>Compare Cities</h1>
      <SearchBar
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onSearch={handleSearch}
      />
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="compare-grid">
          {weatherData.map((weather, index) => (
            <div key={index} className="compare-item">
              <WeatherCard weather={weather} />
              <TimezoneClock
                city={cities[index]}
                timezone={timezoneData[index]?.timezone}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Compare;