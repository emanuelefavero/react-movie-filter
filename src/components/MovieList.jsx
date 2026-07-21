import './MovieList.css';
import { Movie } from './Movie';

export const MovieList = ({ movies, onDeleteMovie }) => {
  if (movies.length === 0) {
    return (
      <p className='movie-list-empty' role='status'>
        Nessun film trovato. Prova a cambiare il filtro o ad aggiungere un nuovo
        film.
      </p>
    );
  }

  return (
    <section aria-labelledby='movies-title'>
      <h2 id='movies-title' className='sr-only'>
        Lista dei film
      </h2>

      {movies.length > 0 && (
        <ul className='movie-list'>
          {movies.map((movie) => (
            <li key={`movie-${movie.id}`}>
              <Movie movie={movie} onDeleteMovie={onDeleteMovie} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};
