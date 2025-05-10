import { createContext, useState, useEffect } from "react";

export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState(() => {
    const savedMovies = localStorage.getItem("lastSearchResults");
    return savedMovies ? JSON.parse(savedMovies) : [];
  });
  const [searchTerm, setSearchTerm] = useState(localStorage.getItem("lastSearch") || "");
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem("favorites");
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const API_KEY = '58a842f542e71a1fec09022d9bbc1900';

  // Save search term to localStorage
  useEffect(() => {
    localStorage.setItem("lastSearch", searchTerm);
  }, [searchTerm]);

  // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Save search results to localStorage
  useEffect(() => {
    if (movies.length > 0) {
      localStorage.setItem("lastSearchResults", JSON.stringify(movies));
    }
  }, [movies]);

  useEffect(() => {
    const fetchMovies = async () => {
      if (!searchTerm) {
        setMovies([]);
        setHasMore(false);
        return;
      }

      try {
        setLoading(true);
        const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(searchTerm)}&page=${page}`;
        const response = await fetch(url);
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.status_message || 'Failed to fetch movies');
        }

        if (page === 1) {
          setMovies(data.results || []);
        } else {
          setMovies(prev => [...prev, ...(data.results || [])]);
        }

        setHasMore(data.page < data.total_pages);
      } catch (error) {
        console.error('Error searching movies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [searchTerm, page]);

  const loadMore = () => {
    if (!loading && hasMore) {
      setPage(prev => prev + 1);
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    setPage(1);
    setHasMore(true);
  };

  const toggleFavorite = (movie) => {
    setFavorites(prev => {
      const isFavorite = prev.some(fav => fav.id === movie.id);
      if (isFavorite) {
        return prev.filter(fav => fav.id !== movie.id);
      } else {
        return [...prev, movie];
      }
    });
  };

  const isFavorite = (movieId) => {
    return favorites.some(fav => fav.id === movieId);
  };

  const clearLastSearch = () => {
    setMovies([]);
    setSearchTerm("");
    localStorage.removeItem("lastSearchResults");
    localStorage.removeItem("lastSearch");
  };

  return (
    <MovieContext.Provider value={{ 
      movies, 
      setMovies, 
      searchTerm, 
      setSearchTerm: handleSearch, 
      favorites,
      toggleFavorite,
      isFavorite,
      loading,
      hasMore,
      loadMore,
      clearLastSearch
    }}>
      {children}
    </MovieContext.Provider>
  );
};
