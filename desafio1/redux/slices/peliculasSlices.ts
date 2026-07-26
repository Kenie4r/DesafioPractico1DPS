import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Movie } from '@/types/pelicula';
import { peliculas } from '@/data/data.js';

const getInitialMovies = (): Movie[] => {


  const storedMovies = localStorage.getItem('moviesCrud');
  if (!storedMovies) {
    return peliculas.map((pelicula) => ({ ...pelicula }));
  }

  try {
    return JSON.parse(storedMovies) as Movie[];
  } catch {
    return peliculas.map((pelicula) => ({ ...pelicula }));
  }
};

const initialState: Movie[] = getInitialMovies();
const normalizeTitle = (value: string) => value.trim().replace(/\s+/g, ' ').toLowerCase();

export const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    addMovie: (state, action: PayloadAction<Omit<Movie, 'id'> & { id?: number }>) => {
      const { id, ...movieData } = action.payload;
      const duplicatedTitle = state.some((pelicula) => normalizeTitle(pelicula.title) === normalizeTitle(movieData.title));
      if (duplicatedTitle) {
        return state;
      }

      const newMovie: Movie = {
        id: id ?? Date.now(),
        ...movieData,
      } as Movie;
      const nextState = [...state, newMovie];
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('moviesCrud', JSON.stringify(nextState));
      }
      return nextState;
    },
    updateMovie: (state, action: PayloadAction<Movie>) => {
      const duplicatedTitle = state.some(
        (pelicula) =>
          pelicula.id !== action.payload.id &&
          normalizeTitle(pelicula.title) === normalizeTitle(action.payload.title)
      );
      if (duplicatedTitle) {
        return state;
      }

      const index = state.findIndex((pelicula) => pelicula.id === action.payload.id);
      if (index !== -1) {
        const nextState = state.map((pelicula) =>
          pelicula.id === action.payload.id ? action.payload : pelicula
        );
        if (typeof window !== 'undefined') {
          window.localStorage.setItem('moviesCrud', JSON.stringify(nextState));
        }
        return nextState;
      }
      return state;
    },
    deleteMovie: (state, action: PayloadAction<number>) => {
      const nextState = state.filter((pelicula) => pelicula.id !== action.payload);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('moviesCrud', JSON.stringify(nextState));
      }
      return nextState;
    },
  },
});

export const { addMovie, updateMovie, deleteMovie } = movieSlice.actions;

export default movieSlice.reducer;