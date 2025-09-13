import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SearchBar from '../search/SearchBar';
import './../../styles/header.css';

function Header() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (city) => {
    if (city) {
      navigate(`/weather/${city}`);
      setSearchQuery('');
    }
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          GlobalWeatherHub
        </Link>
        <nav className="nav">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/timezone" className="nav-link">Timezones</Link>
          <Link to="/compare" className="nav-link">Compare</Link>
          <Link to="/favorites" className="nav-link">Favorites</Link>
        </nav>
        <SearchBar
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onSearch={handleSearch}
        />
      </div>
    </header>
  );
}

export default Header;