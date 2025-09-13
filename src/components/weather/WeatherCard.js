import { useAppContext } from '../../context/AppContext';
import './../../styles/weather.css';

function WeatherCard({ weather }) {
  const { addFavorite, favorites } = useAppContext();
  const isFavorite = favorites.includes(weather.city);

  return (
    <div className="weather-card fade-in">
      <h2>{weather.city}, {weather.country}</h2>
      <img
        src={`/assets/${weather.condition.toLowerCase()}.png`}
        alt={weather.condition}
        className="weather-icon"
      />
      <p>Temperature: {weather.temp}°C</p>
      <p>Condition: {weather.condition}</p>
      <p>Humidity: {weather.humidity}%</p>
      <button
        onClick={() => addFavorite(weather.city)}
        className={isFavorite ? 'favorite-btn active' : 'favorite-btn'}
        disabled={isFavorite}
      >
        {isFavorite ? 'Favorited' : 'Add to Favorites'}
      </button>
    </div>
  );
}

export default WeatherCard;