import React from "react";
import { MovieProvider } from "./MovieContext";
import { FavoritesProvider } from "./FavoritesContext";

export const AppProvider = ({ children }) => {
  return (
    <MovieProvider>
      <FavoritesProvider>
        {children}
      </FavoritesProvider>
    </MovieProvider>
  );
}; 