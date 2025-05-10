import React, { useRef, useCallback } from 'react';
import { Box, Grid, Typography, CircularProgress } from '@mui/material';
import { useMovies } from '../contexts/MovieContext';
import MovieCard from './MovieCard';

const MovieGrid = () => {
  const { movies, loading, error, hasMore, loadMore } = useMovies();
  const observer = useRef();
  const lastMovieElementRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        loadMore();
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, hasMore, loadMore]);

  if (loading && movies.length === 0) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        minHeight: { xs: '200px', sm: '300px' }
      }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ 
        textAlign: 'center', 
        py: { xs: 2, sm: 4 }
      }}>
        <Typography color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  if (movies.length === 0) {
    return (
      <Box sx={{ 
        textAlign: 'center', 
        py: { xs: 2, sm: 4 }
      }}>
        <Typography color="text.secondary">
          No movies found
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
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
          gap: 3,
          px: { xs: 0.5, sm: 1 },
          py: { xs: 1, sm: 2 }
        }}
      >
        {movies.map((movie, index) => (
          <Grid 
            item 
            key={movie.id}
            ref={index === movies.length - 1 ? lastMovieElementRef : null}
          >
            <MovieCard movie={movie} />
          </Grid>
        ))}
      </Grid>
      {loading && (
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          mt: { xs: 2, sm: 3 }
        }}>
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
};

export default MovieGrid;
