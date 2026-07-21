import './App.css';
import { useState, useEffect } from 'react';
import { MovieList } from './components/MovieList';
import { MovieForm } from './components/MovieForm';
import { movies as INITIAL_MOVIES } from './data/movies';
import { MovieFilter } from './components/MovieFilter';

export function App() {
  const [movies, setMovies] = useState(INITIAL_MOVIES);
  const [genreFilter, setGenreFilter] = useState('');
  const filteredMovies = movies.filter((movie) =>
    movie.genre.toLowerCase().includes(genreFilter.toLowerCase()),
  );

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

  const handleChangeGenre = (newGenre) => {
    setGenreFilter(newGenre);
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
          <MovieFilter
            genreFilter={genreFilter}
            onChangeGenre={handleChangeGenre}
          />
          <MovieList
            movies={filteredMovies}
            onDeleteMovie={handleDeleteMovie}
          />
        </div>
      </main>
    </div>
  );
}
