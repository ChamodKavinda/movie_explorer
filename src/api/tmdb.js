// src/api/tmdb.js
const API_KEY = '58a842f542e71a1fec09022d9bbc1900';
const BASE_URL = "https://api.themoviedb.org/3";

export const fetchTrendingMovies = async () => {
  const res = await fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`);
  if (!res.ok) throw new Error("Failed to fetch trending movies");
  return res.json();
};

export const searchMovies = async (query, page = 1) => {
  const res = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`);
  if (!res.ok) throw new Error("Search failed");
  return res.json();
};

// More functions: fetchMovieDetails, fetchCast, fetchVideos, etc.
