import React from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem, Typography, Button, Stack } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

const genres = [
  { id: 28, name: 'Action' },
  { id: 12, name: 'Adventure' },
  { id: 16, name: 'Animation' },
  { id: 35, name: 'Comedy' },
  { id: 80, name: 'Crime' },
  { id: 99, name: 'Documentary' },
  { id: 18, name: 'Drama' },
  { id: 10751, name: 'Family' },
  { id: 14, name: 'Fantasy' },
  { id: 36, name: 'History' },
  { id: 27, name: 'Horror' },
  { id: 10402, name: 'Music' },
  { id: 9648, name: 'Mystery' },
  { id: 10749, name: 'Romance' },
  { id: 878, name: 'Science Fiction' },
  { id: 53, name: 'Thriller' },
  { id: 10752, name: 'War' },
  { id: 37, name: 'Western' }
];

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 50 }, (_, i) => currentYear - i);

const ratingOptions = [
  { value: 0, label: 'Any Rating' },
  { value: 6, label: '6+', stars: 3 },
  { value: 7, label: '7+', stars: 3.5 },
  { value: 8, label: '8+', stars: 4 },
  { value: 9, label: '9+', stars: 4.5 }
];

const FilterBar = ({ filters, onFilterChange }) => {
  const handleGenreChange = (event) => {
    onFilterChange({ ...filters, genre: event.target.value });
  };

  const handleYearChange = (event) => {
    onFilterChange({ ...filters, year: event.target.value });
  };

  const handleRatingChange = (rating) => {
    onFilterChange({ ...filters, rating });
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      gap: 2, 
      flexWrap: 'wrap',
      mb: 3,
      p: 2,
      bgcolor: 'background.paper',
      borderRadius: 1,
      boxShadow: 1
    }}>
      <FormControl sx={{ minWidth: 200 }}>
        <InputLabel>Genre</InputLabel>
        <Select
          value={filters.genre}
          label="Genre"
          onChange={handleGenreChange}
        >
          <MenuItem value="">All Genres</MenuItem>
          {genres.map((genre) => (
            <MenuItem key={genre.id} value={genre.id}>
              {genre.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl sx={{ minWidth: 200 }}>
        <InputLabel>Year</InputLabel>
        <Select
          value={filters.year}
          label="Year"
          onChange={handleYearChange}
        >
          <MenuItem value="">All Years</MenuItem>
          {years.map((year) => (
            <MenuItem key={year} value={year}>
              {year}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Box sx={{ minWidth: 300, flex: 1 }}>
        <Stack direction="row" spacing={1} alignItems="center">
          {ratingOptions.map((option) => (
            <Button
              key={option.value}
              variant={filters.rating === option.value ? "contained" : "outlined"}
              onClick={() => handleRatingChange(option.value)}
              startIcon={option.stars && (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  {Array.from({ length: Math.floor(option.stars) }).map((_, i) => (
                    <StarIcon key={i} sx={{ fontSize: 16, color: 'inherit' }} />
                  ))}
                  {option.stars % 1 !== 0 && (
                    <StarIcon sx={{ fontSize: 16, color: 'inherit', opacity: 0.5 }} />
                  )}
                </Box>
              )}
              sx={{
                minWidth: 'auto',
                px: 2,
                py: 1,
                borderRadius: 2,
                textTransform: 'none',
                '&:hover': {
                  transform: 'translateY(-1px)',
                  boxShadow: 1,
                },
                transition: 'all 0.2s',
              }}
            >
              {option.label}
            </Button>
          ))}
        </Stack>
      </Box>
    </Box>
  );
};

export default FilterBar; 