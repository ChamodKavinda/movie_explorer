import React from "react";
import { 
  TextField, 
  InputAdornment, 
  IconButton, 
  Box,
  Typography,
  Button
} from "@mui/material";
import { Search as SearchIcon, Clear as ClearIcon } from "@mui/icons-material";
import { useMovies } from "../contexts/MovieContext";

const SearchBar = () => {
  const { searchTerm, setSearchTerm, movies, clearLastSearch } = useMovies();

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <Box sx={{ width: '100%', mb: 3 }}>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search for movies..."
        value={searchTerm}
        onChange={handleSearch}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          endAdornment: searchTerm && (
            <InputAdornment position="end">
              <IconButton onClick={() => setSearchTerm("")} edge="end">
                <ClearIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      {movies.length > 0 && (
        <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="body2" color="text.secondary">
            Showing results from your last search
          </Typography>
          <Button 
            startIcon={<ClearIcon />}
            onClick={clearLastSearch}
            size="small"
          >
            Clear Last Search
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default SearchBar;