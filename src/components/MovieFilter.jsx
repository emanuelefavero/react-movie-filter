import { movieGenres } from '@/data/movies';
import { Card } from './ui/Card';
import './MovieFilter.css';

export const MovieFilter = ({ genreFilter, onChangeGenre }) => {
  const handleSubmit = (e) => e.preventDefault();

  return (
    <Card
      as='form'
      className='movie-filter'
      onSubmit={handleSubmit}
      aria-labelledby='movie-filter-title'
      noValidate
    >
      <h2 className='form-title text-xl' id='movie-filter-title'>
        Filtra i film
      </h2>

      <div className='form-group'>
        <label htmlFor='movie-filter-genre'>Genere</label>
        <select
          name='genre'
          id='movie-filter-genre'
          value={genreFilter}
          onChange={(e) => onChangeGenre(e.target.value)}
        >
          <option value=''>Tutti i generi</option>

          {movieGenres.map((genre) => (
            <option key={genre.id} value={genre.name}>
              {genre.name}
            </option>
          ))}
        </select>
      </div>
    </Card>
  );
};
