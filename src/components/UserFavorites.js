import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Box,
  Grid,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useFavorites } from "../contexts/FavoritesContext";
import MovieCard from "./MovieCard";

const UserFavorites = ({ open, onClose }) => {
  const { favorites } = useFavorites();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      PaperProps={{
        sx: {
          minHeight: "80vh",
          maxHeight: "80vh",
        },
      }}
    >
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">My Favorite Movies</Typography>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        {favorites.length === 0 ? (
          <Typography variant="body1" color="text.secondary" textAlign="center" mt={4}>
            You haven't added any movies to your favorites yet.
          </Typography>
        ) : (
          <Grid
            container
            spacing={3}
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "repeat(1, 1fr)",
                sm: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
                lg: "repeat(4, 1fr)",
              },
              gap: 3,
              mt: 2,
            }}
          >
            {favorites.map((movie) => (
              <Grid item key={movie.id}>
                <MovieCard movie={movie} />
              </Grid>
            ))}
          </Grid>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default UserFavorites; 