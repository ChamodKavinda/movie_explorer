import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Chip,
  Box,
  IconButton,
  DialogActions,
  Button,
  CircularProgress,
  Alert
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import axiosInstance from '../api/axios';



const MovieDetailDialog = ({ open, onClose, movie }) => {
  // State for managing movie videos, loading state, and errors
  const [videos, setVideos] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Fetches movie videos when dialog opens
   * Makes API call to get trailers and other videos for the movie
   */
  useEffect(() => {
    const fetchVideos = async () => {
      if (!open || !movie) return;

      try {
        setLoading(true);
        setError(null);
        const data = await axiosInstance.get(`/movie/${movie.id}/videos`);
        setVideos(data.results);
      } catch (err) {
        setError(err.message || 'Failed to fetch movie videos');
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [movie?.id, open]);

  // Return null if dialog is not open or no movie data
  if (!open || !movie) return null;

  /**
   * Handles dialog close
   * Resets video data and error state
   */
  const handleClose = () => {
    setVideos(null);
    setError(null);
    onClose();
  };

  // Find the first YouTube trailer from the videos
  const trailer = videos?.find(v => v.type === "Trailer" && v.site === "YouTube");

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>
        {movie.title}
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {/* Movie Poster and Basic Info Section */}
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <Box
            component="img"
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            sx={{
              width: 200,
              borderRadius: 1,
              display: { xs: 'none', sm: 'block' }
            }}
          />
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" gutterBottom>
              {movie.title}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {new Date(movie.release_date).getFullYear()} • {movie.vote_average?.toFixed(1)} ⭐
            </Typography>
            <Typography variant="body1" paragraph>
              {movie.overview}
            </Typography>
            {/* Genre Chips Section */}
            {movie.genre_ids && (
              <Box sx={{ mb: 2 }}>
                {movie.genre_ids.map((genreId) => (
                  <Chip
                    key={genreId}
                    label={getGenreName(genreId)}
                    size="small"
                    sx={{ mr: 1, mb: 1 }}
                  />
                ))}
              </Box>
            )}
          </Box>
        </Box>

        {/* Loading State */}
        {loading && (
          <Box display="flex" justifyContent="center" my={4}>
            <CircularProgress />
          </Box>
        )}

        {/* Error State */}
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {/* Movie Trailer Section */}
        {trailer && (
          <Box mt={3}>
            <Typography variant="subtitle1" gutterBottom>
              Trailer
            </Typography>
            <Box
              sx={{
                position: 'relative',
                paddingTop: '56.25%', // 16:9 aspect ratio
                width: '100%',
                borderRadius: 1,
                overflow: 'hidden'
              }}
            >
              <iframe
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  border: 0,
                }}
                src={`https://www.youtube.com/embed/${trailer.key}`}
                title="YouTube trailer"
                allowFullScreen
              />
            </Box>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

const getGenreName = (genreId) => {
  const genres = {
    28: 'Action',
    12: 'Adventure',
    16: 'Animation',
    35: 'Comedy',
    80: 'Crime',
    99: 'Documentary',
    18: 'Drama',
    10751: 'Family',
    14: 'Fantasy',
    36: 'History',
    27: 'Horror',
    10402: 'Music',
    9648: 'Mystery',
    10749: 'Romance',
    878: 'Science Fiction',
    53: 'Thriller',
    10752: 'War',
    37: 'Western'
  };
  return genres[genreId] || 'Unknown';
};

export default MovieDetailDialog;