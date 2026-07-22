import './MovieForm.css';
import { useState } from 'react';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Select } from './ui/Select';
import { movieGenres } from '@/data/movies';
import { Card } from './ui/Card';

const INITIAL_FORM_DATA = {
  title: '',
  genre: '',
};

const validateForm = (data) => {
  const errors = {};

  if (!data.title) {
    errors.title = 'Title è obbligatorio';
  } else if (data.title.length < 3) {
    errors.title = 'Il titolo deve contenere almeno 3 caratteri';
  } else if (data.title.length > 100) {
    errors.title = 'Il titolo deve contenere meno di 100 caratteri';
  }

  if (!data.genre) errors.genre = 'Genere è obbligatorio';

  return errors;
};

export const MovieForm = ({ onAddMovie }) => {
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState({});

  const handleFormData = (e) => {
    const { type, name, value, checked } = e.target;

    const fieldValue = type === 'checkbox' ? checked : value;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: fieldValue,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const submittedData = {
      ...formData,
      title: formData.title.trim(),
      genre: formData.genre.trim(),
    };

    const validationErrors = validateForm(submittedData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    onAddMovie(submittedData);
    setFormData(INITIAL_FORM_DATA);
    setErrors({});
  };

  return (
    <Card
      as='form'
      className='movie-form'
      onSubmit={handleSubmit}
      aria-labelledby='movie-form-heading'
    >
      <h2 className='form-title text-xl' id='movie-form-heading'>
        Aggiungi un nuovo film
      </h2>

      <div className='form-group'>
        <label htmlFor='movie-form-title'>Titolo</label>
        <Input
          name='title'
          placeholder='Titolo del film'
          id='movie-form-title'
          value={formData.title}
          onChange={handleFormData}
          aria-invalid={Boolean(errors.title)}
          aria-describedby={errors.title ? 'title-error' : undefined}
          required
          minLength={3}
          maxLength={100}
        />

        {errors.title && (
          <p className='form-error' id='title-error'>
            {errors.title}
          </p>
        )}
      </div>

      <div className='form-group'>
        <label htmlFor='movie-form-genre'>Genere</label>
        <Select
          name='genre'
          id='movie-form-genre'
          value={formData.genre}
          onChange={handleFormData}
          aria-invalid={Boolean(errors.genre)}
          aria-describedby={errors.genre ? 'genre-error' : undefined}
          required
        >
          <option value='' disabled>
            Seleziona un genere
          </option>

          {movieGenres.map((genre) => (
            <option key={genre.id} value={genre.name}>
              {genre.name}
            </option>
          ))}
        </Select>

        {errors.genre && (
          <p className='form-error' id='genre-error'>
            {errors.genre}
          </p>
        )}
      </div>

      <div className='form-actions'>
        <Button type='submit' variant={Button.variant.primary}>
          Aggiungi film
        </Button>
      </div>
    </Card>
  );
};
