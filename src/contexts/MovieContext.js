import React, { createContext, useState, useEffect, useContext } from "react";
import axiosInstance from '../api/axios';

const MovieContext = createContext();

export const useMovies = () => {
  const context = useContext(MovieContext);
  if (!context) {
    throw new Error("useMovies must be used within a MovieProvider");
  }
  return context;
};

export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState(() => {
    const savedMovies = localStorage.getItem("lastSearchResults");
    return savedMovies ? JSON.parse(savedMovies) : [];
  });
  const [trending, setTrending] = useState([]);
  const [searchTerm, setSearchTerm] = useState(localStorage.getItem("lastSearch") || "");
  const [page, setPage] = useState(1);
  const [trendingPage, setTrendingPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [hasMoreTrending, setHasMoreTrending] = useState(true);
  const [loading, setLoading] = useState(false);
  const [trendingLoading, setTrendingLoading] = useState(false);
  const [error, setError] = useState(null);

  // Save search term and results to localStorage
  useEffect(() => {
    localStorage.setItem("lastSearch", searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    if (movies.length > 0) {
      localStorage.setItem("lastSearchResults", JSON.stringify(movies));
    }
  }, [movies]);

  // Fetch trending movies
  useEffect(() => {
    const fetchTrending = async () => {
      // Skip fetch if we're navigating from Movie Explorer click
      if (window.history.state?.usr?.skipFetch) {
        return;
      }

      try {
        setTrendingLoading(true);
        const data = await axiosInstance.get('/trending/movie/week', {
          params: { page: trendingPage }
        });
        
        if (trendingPage === 1) {
          setTrending(data.results);
        } else {
          setTrending(prev => [...prev, ...data.results]);
        }
        
        setHasMoreTrending(data.page < data.total_pages);
      } catch (err) {
        setError(err.message || 'Failed to fetch trending movies');
      } finally {
        setTrendingLoading(false);
      }
    };

    fetchTrending();
  }, [trendingPage]);

  // Search movies
  useEffect(() => {
    const fetchMovies = async () => {
      if (!searchTerm) {
        setMovies([]);
        setHasMore(false);
        return;
      }

      try {
        setLoading(true);
        const data = await axiosInstance.get('/search/movie', {
          params: {
            query: searchTerm,
            page: page
          }
        });
        
        if (page === 1) {
          setMovies(data.results);
        } else {
          setMovies(prev => [...prev, ...data.results]);
        }
        
        setHasMore(data.page < data.total_pages);
      } catch (err) {
        setError(err.message || 'Failed to fetch movies');
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

  const loadMoreTrending = () => {
    if (!trendingLoading && hasMoreTrending) {
      setTrendingPage(prev => prev + 1);
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    setPage(1);
    setHasMore(true);
  };

  const clearLastSearch = () => {
    setMovies([]);
    setSearchTerm("");
    localStorage.removeItem("lastSearchResults");
    localStorage.removeItem("lastSearch");
  };

  const value = {
    movies,
    trending,
    searchTerm,
    loading,
    trendingLoading,
    error,
    hasMore,
    hasMoreTrending,
    setSearchTerm: handleSearch,
    loadMore,
    loadMoreTrending,
    clearLastSearch
  };

  return (
    <MovieContext.Provider value={value}>
      {children}
    </MovieContext.Provider>
  );
}; 