import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { searchCities } from '../../services/weatherApi';
import { useAppContext } from '../../context/AppContext';
import './../../styles/search.css';

function SearchBar({ value, onChange, onSearch }) {
  const { setSearchResults } = useAppContext();
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (value.length > 2) {
      searchCities(value)
        .then((data) => {
          setSuggestions(data);
          setSearchResults(data);
        })
        .catch(() => toast.error('Error fetching cities'));
    } else {
      setSuggestions([]);
    }
  }, [value, setSearchResults]);

  const handleSelect = (city) => {
    onSearch(city);
    setSuggestions([]);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Search city..."
        className="search-input"
      />
      {suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((city) => (
            <li key={city.id} onClick={() => handleSelect(city.name)} className="suggestion-item">
              {city.name}, {city.country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchBar;