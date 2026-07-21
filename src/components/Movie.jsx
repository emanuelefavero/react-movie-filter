import './Movie.css';
import { Trash2 } from 'lucide-react';
import { Button } from './ui/Button';

export const Movie = ({ movie, onDeleteMovie }) => (
  <article className='movie'>
    <div className='content'>
      <h2>{movie.title}</h2>
      <p className='genre text-sm'>{movie.genre}</p>
    </div>
    <Button
      variant={Button.variant.danger}
      className='delete-button'
      aria-label={`Delete ${movie.title}`}
      onClick={() => onDeleteMovie(movie.id)}
    >
      <Trash2 size={18} aria-hidden='true' />
    </Button>
  </article>
);
