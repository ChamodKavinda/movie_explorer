import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Box,
  Rating,
  useTheme,
  useMediaQuery
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useFavorites } from '../contexts/FavoritesContext';
import MovieDetailDialog from './MovieDetailDialog';


const MovieCard = ({ movie }) => {
  // Hooks for favorites functionality
  const { favorites, toggleFavorite } = useFavorites();
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  // Check if the movie is in favorites
  const isFavorite = favorites.some((fav) => fav.id === movie.id);

  /**
   * Handles card click to show movie details dialog
   */
  const handleCardClick = () => {
    setOpen(true);
  };

  /**
   * Handles favorite button click
   * Prevents event propagation to avoid triggering card click
   * @param {Event} e - Click event
   */
  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    toggleFavorite(movie);
  };

  return (
    <>
      {/* Movie Card Container */}
      <Card
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          cursor: 'pointer',
          transition: 'transform 0.2s',
          '&:hover': {
            transform: 'scale(1.02)',
          },
        }}
        onClick={handleCardClick}
      >
        {/* Movie Poster */}
        <CardMedia
          component="img"
          height={isMobile ? 200 : 300}
          image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          sx={{
            objectFit: 'cover',
            aspectRatio: '2/3'
          }}
        />
        
        {/* Movie Info Content */}
        <CardContent sx={{ flexGrow: 1, position: 'relative' }}>
          {/* Movie Title */}
          <Typography gutterBottom variant={isMobile ? "subtitle1" : "h6"} component="div" noWrap>
            {movie.title}
          </Typography>
          
          {/* Release Year */}
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            {new Date(movie.release_date).getFullYear()}
          </Typography>
          
          {/* Rating Section */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Rating
              value={movie.vote_average / 2}
              precision={0.5}
              readOnly
              size={isMobile ? "small" : "medium"}
              sx={{ 
                '& .MuiRating-iconFilled': {
                  color: 'primary.main'
                }
              }}
            />
            <Typography variant="body2" color="text.secondary">
              ({movie.vote_average.toFixed(1)})
            </Typography>
          </Box>

          {/* Favorite Button */}
          <IconButton
            sx={{
              position: 'absolute',
              top: { xs: 4, sm: 8 },
              right: { xs: 4, sm: 8 },
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 1)',
              },
            }}
            onClick={handleFavoriteClick}
          >
            {isFavorite ? (
              <FavoriteIcon color="error" />
            ) : (
              <FavoriteBorderIcon />
            )}
          </IconButton>
        </CardContent>
      </Card>

      {/* Movie Detail Dialog */}
      <MovieDetailDialog
        open={open}
        onClose={() => setOpen(false)}
        movie={movie}
      />
    </>
  );
};

export default MovieCard;