# Movie Explorer

A modern web application for exploring movies, built with React and Material-UI. This application allows users to search for movies, view trending movies, manage favorites, and get detailed information about movies.

## Features

### 🎬 Movie Discovery

- Search for movies with real-time results
- View trending movies
- Infinite scroll for loading more movies
- Detailed movie information including:
  - Movie posters
  - Release dates
  - Ratings
  - Genres
  - Trailers (when available)

### ⭐ Favorites Management

- Add/remove movies to favorites
- View your favorite movies in a dedicated section
- Persistent storage of favorites using localStorage

### 🎨 User Interface

- Responsive design that works on all devices
- Dark/Light theme support
- Modern Material-UI components
- Smooth animations and transitions
- Loading states and error handling

### 🔐 Authentication

- User authentication system
- Protected routes
- Persistent login state

## Tech Stack

- **Frontend Framework**: React
- **UI Library**: Material-UI (MUI)
- **State Management**: React Context API
- **Routing**: React Router
- **API Integration**: Axios
- **Styling**: MUI's styled components
- **Icons**: Material Icons

## Project Setup

1. Clone the repository:

```bash
git clone <repository-url>
cd movie-explorer
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory and add your TMDB API key:

```
REACT_APP_API_KEY=your_tmdb_api_key_here
```

4. Start the development server:

```bash
npm start
```

## API Integration

This project uses The Movie Database (TMDB) API. The following endpoints are used:

- `/search/movie` - Search for movies
- `/trending/movie/week` - Get trending movies
- `/movie/{id}/videos` - Get movie trailers

### API Configuration

The API is configured in `src/api/axios.js` with:

- Base URL: `https://api.themoviedb.org/3`
- API key management through environment variables
- Error handling and response interceptors

## Project Structure

```
src/
├── api/              # API configuration and services
├── components/       # Reusable UI components
├── contexts/         # React Context providers
├── pages/           # Page components
└── App.js           # Main application component
```

### Key Components

- **MovieCard**: Displays individual movie information
- **SearchBar**: Handles movie search functionality
- **MovieGrid**: Displays search results
- **TrendingMovies**: Shows trending movies
- **UserFavorites**: Manages favorite movies
- **MovieDetailDialog**: Shows detailed movie information

### Context Providers

- **MovieContext**: Manages movie data and search state
- **FavoritesContext**: Handles favorites functionality
- **ThemeContext**: Manages theme preferences
- **AuthContext**: Handles authentication state

## Features in Detail

### Search Functionality

- Real-time search as you type
- Debounced API calls to prevent rate limiting
- Clear search results option
- Persistent search history

### Trending Movies

- Weekly trending movies
- Infinite scroll pagination
- Filtering options:
  - By genre
  - By year
  - By rating

### Favorites System

- Add/remove movies to favorites
- Persistent storage using localStorage
- Quick access through user menu
- Visual indicators for favorite status

### Theme Support

- Light and dark mode
- Persistent theme preference
- Smooth theme transitions
- Responsive design for all screen sizes

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [The Movie Database (TMDB)](https://www.themoviedb.org/) for providing the API
- [Material-UI](https://mui.com/) for the component library
- [React](https://reactjs.org/) for the frontend framework
