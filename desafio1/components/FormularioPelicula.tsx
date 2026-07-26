'use client';

import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { addMovie, updateMovie } from '@/redux/slices/peliculasSlices';
import { addTheatersForMovie } from '@/redux/slices/salasSlice';
import type { Movie } from '@/types/pelicula';

type FormularioPeliculaProps = {
  pelicula?: Movie | null;
  onCancel?: () => void;
};

type MovieForm = {
  title: string;
  genre: string;
  duration: number;
  status: string;
  description: string;
  author: string;
  image: string;
};

type FormErrors = {
  title?: string;
  genre?: string;
  duration?: string;
  status?: string;
  description?: string;
  author?: string;
  image?: string;
};

const initialForm: MovieForm = {
  title: '',
  genre: '',
  duration: 120,
  status: 'En cartelera',
  description: '',
  author: '',
  image: '',
};

export default function FormularioPelicula({ pelicula, onCancel }: FormularioPeliculaProps) {
  const dispatch = useAppDispatch();
  const peliculas = useAppSelector((state) => state.movie);
  const [formData, setFormData] = useState<MovieForm>(initialForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});

  const normalizeTitle = (value: string) => value.trim().replace(/\s+/g, ' ').toLowerCase();

  useEffect(() => {
    if (pelicula) {
      setFormData({
        title: pelicula.title,
        genre: pelicula.genre,
        duration: pelicula.duration,
        status: pelicula.status,
        description: pelicula.description,
        author: pelicula.author,
        image: pelicula.image,
      });
      setEditingId(pelicula.id);
      return;
    }

    setFormData(initialForm);
    setEditingId(null);
  }, [pelicula]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;

    if (errors[name as keyof MovieForm]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }

    setFormData((prev) => ({
      ...prev,
      [name]: name === 'duration' ? Number(value) : value,
    }));
  };

  const resetForm = () => {
    setFormData(initialForm);
    setEditingId(null);
    setErrors({});
    onCancel?.();
  };

  const isValidUrl = (value: string) => {
    try {
      const parsed = new URL(value);
      return parsed.protocol === 'http:' || parsed.protocol === 'https:';
    } catch {
      return false;
    }
  };

  const validateForm = (values: MovieForm): FormErrors => {
    const nextErrors: FormErrors = {};
    const duplicatedTitle = peliculas.some(
      (movie) => normalizeTitle(movie.title) === normalizeTitle(values.title) && movie.id !== editingId
    );

    if (!values.title.trim()) {
      nextErrors.title = 'El titulo es obligatorio.';
    } else if (duplicatedTitle) {
      nextErrors.title = 'Ya existe una pelicula con este titulo.';
    }

    if (!values.genre.trim()) {
      nextErrors.genre = 'El genero es obligatorio.';
    }

    if (!Number.isFinite(values.duration) || values.duration < 60) {
      nextErrors.duration = 'La duracion debe ser de al menos 60 minutos.';
    }

    if (!values.description.trim() || values.description.trim().length < 10) {
      nextErrors.description = 'La descripcion debe tener al menos 10 caracteres.';
    }

    if (!values.author.trim()) {
      nextErrors.author = 'El autor o direccion es obligatorio.';
    }

    if (!isValidUrl(values.image.trim())) {
      nextErrors.image = 'La URL de la imagen debe ser valida (http o https).';
    }

    return nextErrors;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalizedData: MovieForm = {
      ...formData,
      title: formData.title.trim(),
      genre: formData.genre.trim(),
      duration: Number(formData.duration),
      description: formData.description.trim(),
      author: formData.author.trim(),
      image: formData.image.trim(),
    };

    const formErrors = validateForm(normalizedData);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setErrors({});

    if (editingId) {
      dispatch(updateMovie({ id: editingId, ...normalizedData }));
    } else {
      const newMovieId = Date.now();
      dispatch(addMovie({ id: newMovieId, ...normalizedData }));
      dispatch(addTheatersForMovie(newMovieId));
    }

    resetForm();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="text-sm font-medium text-slate-700">
          Título
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
            placeholder="Ej. Inception"
            required
          />
          {errors.title && <p className="mt-1 text-xs text-rose-600">{errors.title}</p>}
        </label>

        <label className="text-sm font-medium text-slate-700">
          Género
          <input
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
            placeholder="Ej. Ciencia ficción"
            required
          />
          {errors.genre && <p className="mt-1 text-xs text-rose-600">{errors.genre}</p>}
        </label>

        <label className="text-sm font-medium text-slate-700">
          Duración (min)
          <input
            type="number"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
            min="60"
            required
          />
          {errors.duration && <p className="mt-1 text-xs text-rose-600">{errors.duration}</p>}
        </label>

        <label className="text-sm font-medium text-slate-700">
          Estado
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
          >
            <option value="En cartelera">En cartelera</option>
            <option value="Próximamente">Próximamente</option>
            <option value="Finalizada">Finalizada</option>
          </select>
        </label>
      </div>

      <label className="block text-sm font-medium text-slate-700">
        Descripción
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
          placeholder="Describe la película"
          required
        />
        {errors.description && <p className="mt-1 text-xs text-rose-600">{errors.description}</p>}
      </label>

      <label className="block text-sm font-medium text-slate-700">
        Autor / Dirección
        <input
          name="author"
          value={formData.author}
          onChange={handleChange}
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
          placeholder="Ej. Christopher Nolan"
          required
        />
        {errors.author && <p className="mt-1 text-xs text-rose-600">{errors.author}</p>}
      </label>

      <label className="block text-sm font-medium text-slate-700">
        URL de imagen
        <input
          name="image"
          value={formData.image}
          onChange={handleChange}
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
          placeholder="https://..."
          required
        />
        {errors.image && <p className="mt-1 text-xs text-rose-600">{errors.image}</p>}
      </label>

      <div className="flex flex-wrap gap-3 pt-2">
        <button
          type="submit"
          className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white transition hover:bg-blue-700"
        >
          {editingId ? 'Actualizar película' : 'Guardar película'}
        </button>
        <button
          type="button"
          onClick={resetForm}
          className="rounded-lg border border-slate-300 px-4 py-2 font-semibold text-slate-700"
        >
          Limpiar
        </button>
      </div>
    </form>
  );
}
