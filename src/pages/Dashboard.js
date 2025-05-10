import React from "react";
import { Container, Box, AppBar, Toolbar, Typography, IconButton, Avatar, Menu, MenuItem, useMediaQuery, useTheme as useMuiTheme } from "@mui/material";
import { useMovies } from "../contexts/MovieContext";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import MovieGrid from "../components/MovieGrid";
import TrendingMovies from "../components/TrendingMovies";
import ThemeToggle from "../components/ThemeToggle";
import MovieIcon from '@mui/icons-material/Movie';
import UserFavorites from "../components/UserFavorites";

const Dashboard = () => {
  const { searchTerm, clearLastSearch } = useMovies();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('sm'));
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [favoritesOpen, setFavoritesOpen] = React.useState(false);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleFavoritesClick = () => {
    setFavoritesOpen(true);
    handleClose();
  };

  const handleLogout = () => {
    logout();
    handleClose();
    navigate("/");
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="sticky" color="primary" elevation={0}>
        <Toolbar sx={{ 
          px: { xs: 1, sm: 2 },
          py: { xs: 1, sm: 1.5 }
        }}>
          <MovieIcon sx={{ 
            mr: { xs: 1, sm: 2 },
            fontSize: { xs: '1.5rem', sm: '2rem' }
          }} />
          <Typography 
            variant={isMobile ? "subtitle1" : "h6"} 
            component="div" 
            sx={{ 
              flexGrow: 1,
              display: { xs: 'none', sm: 'block' },
              cursor: 'pointer',
              '&:hover': {
                opacity: 0.8
              }
            }}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              clearLastSearch();
              if (window.location.pathname !== '/dashboard') {
                navigate('/dashboard', { 
                  replace: true,
                  state: { skipFetch: true }
                });
              }
            }}
          >
            Movie Explorer
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, sm: 1 } }}>
            <ThemeToggle />
            <IconButton
              size={isMobile ? "small" : "medium"}
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <Avatar sx={{ 
                width: { xs: 28, sm: 32 }, 
                height: { xs: 28, sm: 32 },
                fontSize: { xs: '0.875rem', sm: '1rem' }
              }}>
                {user?.name?.charAt(0) || 'U'}
              </Avatar>
            </IconButton>
          </Box>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            PaperProps={{
              sx: {
                mt: 1,
                minWidth: { xs: '150px', sm: '180px' }
              }
            }}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleFavoritesClick}>My Favorites</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <Container 
        maxWidth="xl" 
        sx={{ 
          flex: 1,
          px: { xs: 1, sm: 2 },
          py: { xs: 2, sm: 4 }
        }}
      >
        <Box sx={{ 
          display: 'flex',
          flexDirection: 'column',
          gap: { xs: 2, sm: 3 }
        }}>
          <SearchBar />
          {searchTerm ? (
            <MovieGrid />
          ) : (
            <TrendingMovies />
          )}
        </Box>
      </Container>

      <UserFavorites 
        open={favoritesOpen} 
        onClose={() => setFavoritesOpen(false)} 
      />
    </Box>
  );
};

export default Dashboard; 