import './App.css';
import { useState } from 'react';
import { MovieList } from './components/MovieList';
import { MovieForm } from './components/MovieForm';
import { movies as INITIAL_MOVIES } from './data/movies';

export function App() {
  const [movies, setMovies] = useState(INITIAL_MOVIES);

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
          <MovieList movies={movies} onDeleteMovie={handleDeleteMovie} />
        </div>
      </main>
    </div>
  );
}
