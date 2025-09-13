import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getCurrentWeather } from '../services/weatherApi';
import WeatherCard from '../components/weather/WeatherCard';
import SearchBar from '../components/search/SearchBar';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { useAppContext } from '../context/AppContext';
import '../styles/global.css'; // Fixed path


function Home() {
  const { searchResults } = useAppContext();
  const [featuredCities, setFeaturedCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const cities = ['London', 'New York', 'Tokyo'];
    Promise.all(cities.map((city) => getCurrentWeather(city)))
      .then((data) => setFeaturedCities(data))
      .catch(() => toast.error('Error fetching featured cities'))
      .finally(() => setLoading(false));
  }, []);

  const handleSearch = (city) => {
    if (city) {
      window.location.href = `/weather/${city}`;
    }
  };

  return (
    <div className="home-page">
      <h1>Global Weather Hub</h1>
      <SearchBar
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onSearch={handleSearch}
      />
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="weather-grid">
          {featuredCities.map((weather) => (
            <WeatherCard key={weather.city} weather={weather} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;