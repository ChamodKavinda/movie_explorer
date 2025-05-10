import React, { useState, useMemo, useEffect } from "react";
import { Typography, Grid, CircularProgress, Alert, Box, Button } from "@mui/material";
import { useMovies } from "../contexts/MovieContext";
import { useLocation } from "react-router-dom";
import MovieCard from "./MovieCard";
import FilterBar from "./FilterBar";

const TrendingMovies = () => {
  const { trending, loading, error, loadMoreTrending, hasMoreTrending } = useMovies();
  const location = useLocation();
  const [filters, setFilters] = useState({
    genre: "",
    year: "",
    rating: 0
  });

  // Skip initial fetch if navigating from Movie Explorer click
  useEffect(() => {
    if (location.state?.skipFetch) {
      // Clear the state after using it
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const filteredMovies = useMemo(() => {
    return trending.filter(movie => {
      // Filter by genre
      if (filters.genre && !movie.genre_ids.includes(Number(filters.genre))) {
        return false;
      }

      // Filter by year
      if (filters.year) {
        const movieYear = new Date(movie.release_date).getFullYear();
        if (movieYear !== Number(filters.year)) {
          return false;
        }
      }

      // Filter by rating
      if (filters.rating > 0 && movie.vote_average < filters.rating) {
        return false;
      }

      return true;
    });
  }, [trending, filters]);

  if (error) {
    return (
      <Alert severity="error" sx={{ mt: 2 }}>
        {error}
      </Alert>
    );
  }

  return (
    <Box sx={{ width: '100%', mt: 3 }}>
      <Typography variant="h6" mb={2} fontWeight="bold">
        Trending Movies
      </Typography>

      <FilterBar filters={filters} onFilterChange={setFilters} />

      <Grid 
        container 
        spacing={3}
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
            lg: 'repeat(4, 1fr)'
          },
          gap: 3
        }}
      >
        {filteredMovies.map((movie) => (
          <Grid item key={movie.id}>
            <MovieCard movie={movie} />
          </Grid>
        ))}
      </Grid>
      
      <Box 
        display="flex" 
        flexDirection="column" 
        alignItems="center" 
        mt={4} 
        mb={2}
      >
        {loading ? (
          <Box display="flex" alignItems="center" gap={2}>
            <CircularProgress size={24} />
            <Typography variant="body1" color="text.secondary">
              Loading more movies...
            </Typography>
          </Box>
        ) : hasMoreTrending ? (
          <Button 
            variant="contained" 
            onClick={loadMoreTrending}
            size="large"
            sx={{
              minWidth: '200px',
              py: 1.5,
              borderRadius: 2,
              textTransform: 'none',
              fontSize: '1.1rem',
              boxShadow: 2,
              '&:hover': {
                boxShadow: 4,
              }
            }}
          >
            Load More Movies
          </Button>
        ) : (
          <Typography variant="body1" color="text.secondary">
            No more trending movies to load
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default TrendingMovies;