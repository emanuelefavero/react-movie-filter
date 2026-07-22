import './App.css';
import { useState, useEffect } from 'react';
import { MovieList } from './components/MovieList';
import { MovieForm } from './components/MovieForm';
import { movies as INITIAL_MOVIES } from './data/movies';
import { MovieFilter } from './components/MovieFilter';

const INITIAL_FILTERS = {
  title: '',
  genre: '',
};

export function App() {
  const [movies, setMovies] = useState(INITIAL_MOVIES);
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const [filteredMovies, setFilteredMovies] = useState(movies);

  const handleAddMovie = (movieData) => {
    const newMovie = {
      id: crypto.randomUUID(),
      ...movieData,
    };
    setMovies((prevMovies) => [newMovie, ...prevMovies]);
  };

  const handleDeleteMovie = (id) => {
    setMovies((prevMovies) => prevMovies.filter((movie) => movie.id !== id));
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;

    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  useEffect(() => {
    const filterTitle = filters.title.trim().toLowerCase();

    const nextFilteredMovies = movies.filter((movie) => {
      const movieTitle = movie.title.trim().toLowerCase();

      const matchesTitle = movieTitle.includes(filterTitle);
      const matchesGenre = !filters.genre || movie.genre === filters.genre;

      return matchesTitle && matchesGenre;
    });

    setFilteredMovies(nextFilteredMovies);
  }, [movies, filters]);

  return (
    <div className='app'>
      <header className='header'>
        <div className='container'>
          <h1 className='font-semibold text-4xl'>
            Trova il tuo film preferito
          </h1>
        </div>
      </header>

      <main className='main'>
        <div className='container'>
          <MovieForm onAddMovie={handleAddMovie} />
          <MovieFilter filters={filters} onFilterChange={handleFilterChange} />
          <MovieList
            movies={filteredMovies}
            onDeleteMovie={handleDeleteMovie}
          />
        </div>
      </main>
    </div>
  );
}
