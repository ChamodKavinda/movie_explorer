import React from "react";
import { CssBaseline } from "@mui/material";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AppProvider } from "./contexts/AppProvider";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { FavoritesProvider } from "./contexts/FavoritesContext";
import Dashboard from "./pages/Dashboard";
import LoginPage from "./pages/LoginPage";


// Protected Route component
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/" replace />;
  }
  return children;
};

const AppContent = () => {
  return (
    <ThemeProvider>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <AppProvider>
        <FavoritesProvider>
          <AppContent />
        </FavoritesProvider>
      </AppProvider>
    </AuthProvider>
  );
};

export default App;
