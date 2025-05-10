import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton,
  Card,
  CardContent,
  Box,
  Alert,
  CircularProgress,
  useTheme,
  useMediaQuery
} from "@mui/material";
import { Visibility, VisibilityOff, Movie } from "@mui/icons-material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!username.trim() || !password.trim()) {
      setError("Please enter both username and password");
      setLoading(false);
      return;
    }

    try {
      const result = await login(username, password);
      if (result.success) {
        navigate("/dashboard");
      } else {
        setError(result.error || "Invalid username or password");
      }
    } catch (err) {
      setError("An error occurred during login");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin(e);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #141e30, #243b55)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        px: { xs: 2, sm: 3 },
        py: { xs: 2, sm: 3 }
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ width: "100%", maxWidth: isMobile ? "100%" : "400px" }}
      >
        <Card 
          sx={{ 
            borderRadius: { xs: 2, sm: 3 }, 
            boxShadow: { xs: 4, sm: 6 },
            p: { xs: 2, sm: 3 }
          }}
        >
          <CardContent sx={{ p: { xs: 1, sm: 2 } }}>
            <Box 
              textAlign="center" 
              mb={{ xs: 2, sm: 3 }}
            >
              <Movie 
                color="primary" 
                sx={{ 
                  fontSize: { xs: '2.5rem', sm: '3rem' },
                  mb: { xs: 1, sm: 1.5 }
                }} 
              />
              <Typography 
                variant={isMobile ? "h6" : "h5"} 
                fontWeight="bold"
                sx={{ mb: { xs: 0.5, sm: 1 } }}
              >
                Movie Explorer
              </Typography>
              <Typography 
                variant="subtitle2" 
                color="text.secondary"
                sx={{ 
                  fontSize: { xs: '0.75rem', sm: '0.875rem' }
                }}
              >
                Sign in to explore trending movies
              </Typography>
            </Box>

            <form onSubmit={handleLogin}>
              <TextField
                fullWidth
                label="Username"
                margin="normal"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyPress={handleKeyPress}
                autoFocus
                disabled={loading}
                size={isMobile ? "small" : "medium"}
                sx={{ mb: { xs: 1.5, sm: 2 } }}
              />
              <TextField
                fullWidth
                label="Password"
                type={showPassword ? "text" : "password"}
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={loading}
                size={isMobile ? "small" : "medium"}
                sx={{ mb: { xs: 1.5, sm: 2 } }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword((prev) => !prev)}
                        edge="end"
                        disabled={loading}
                        size={isMobile ? "small" : "medium"}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              {error && (
                <Alert 
                  severity="error" 
                  sx={{ 
                    mt: { xs: 1.5, sm: 2 },
                    mb: { xs: 1.5, sm: 2 },
                    fontSize: { xs: '0.75rem', sm: '0.875rem' }
                  }}
                >
                  {error}
                </Alert>
              )}

              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{ 
                  mt: { xs: 1.5, sm: 2 },
                  py: { xs: 1, sm: 1.5 },
                  fontSize: { xs: '0.875rem', sm: '1rem' }
                }}
                disabled={loading}
              >
                {loading ? (
                  <CircularProgress 
                    size={isMobile ? 20 : 24} 
                    color="inherit" 
                  />
                ) : (
                  "Login"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </Box>
  );
};

export default LoginPage;
