import { useState } from 'react';
import AppContext from './AppContext'; // Default import

export function AppProvider({ children }) {
  // State for search results and favorites
  const [searchResults, setSearchResults] = useState([]);
  const [favorites, setFavorites] = useState([]);

  // Functions to manage favorites
  const addFavorite = (city) => {
    if (!favorites.includes(city)) {
      setFavorites([...favorites, city]);
    }
  };

  const removeFavorite = (city) => {
    setFavorites(favorites.filter((fav) => fav !== city));
  };

  return (
    <AppContext.Provider
      value={{ searchResults, setSearchResults, favorites, addFavorite, removeFavorite }}
    >
      {children}
    </AppContext.Provider>
  );
}