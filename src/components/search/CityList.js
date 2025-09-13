import { useAppContext } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';
import './../../styles/search.css';

function CityList() {
  const { searchResults } = useAppContext();
  const navigate = useNavigate();

  const handleSelect = (city) => {
    navigate(`/weather/${city}`);
  };

  return (
    <div className="city-list fade-in">
      {searchResults.length > 0 ? (
        <ul className="suggestions-list">
          {searchResults.map((city) => (
            <li
              key={city.id}
              onClick={() => handleSelect(city.name)}
              className="suggestion-item"
            >
              {city.name}, {city.country}
            </li>
          ))}
        </ul>
      ) : (
        <p>No cities found</p>
      )}
    </div>
  );
}

export default CityList;