import { movieGenres } from '@/data/movies';
import { Card } from './ui/Card';
import './MovieFilter.css';
import { Input } from './ui/Input';

export const MovieFilter = ({ filters, onFilterChange }) => {
  const handleSubmit = (e) => e.preventDefault();

  return (
    <Card
      as='form'
      className='movie-filter'
      onSubmit={handleSubmit}
      aria-labelledby='movie-filter-heading'
      noValidate
    >
      <h2 className='form-title text-xl' id='movie-filter-heading'>
        Filtra i film
      </h2>

      <div className='form-group'>
        <label htmlFor='movie-filter-title'>Titolo</label>
        <Input
          name='title'
          id='movie-filter-title'
          placeholder='Cerca per titolo'
          value={filters.title}
          onChange={onFilterChange}
        />
      </div>

      <div className='form-group'>
        <label htmlFor='movie-filter-genre'>Genere</label>
        <select
          name='genre'
          id='movie-filter-genre'
          value={filters.genre}
          onChange={onFilterChange}
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
