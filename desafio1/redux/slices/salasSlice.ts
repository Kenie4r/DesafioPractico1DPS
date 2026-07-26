import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { MovieTheather } from '@/types/Sala';
import { salasData, buildSalasForMovie } from '@/data/salasData';

const getInitialTheaters = (): MovieTheather[] => {
    if (typeof window === 'undefined') {
        return salasData;
    }

    const storedTheaters = window.localStorage.getItem('movieTheaters');
    if (!storedTheaters) {
        return salasData;
    }

    try {
        return JSON.parse(storedTheaters) as MovieTheather[];
    } catch {
        return salasData;
    }
};

const initialState: MovieTheather[] = getInitialTheaters();

export const movieTheatherSlice = createSlice({
    name: 'movieTheater',
    initialState,
    reducers: {
        cambioSala: (_state, action: PayloadAction<MovieTheather[]>) => action.payload,
        syncSelectedTheater: (state, action: PayloadAction<MovieTheather>) => {
            const selectedTheater = action.payload;

            if (!selectedTheater || selectedTheater.movieId === 0) {
                return state;
            }

            const nextState = state.map((sala) => {
                const sameMovie = sala.movieId === selectedTheater.movieId;
                const sameNumber = sala.MovieTheaterNumber === selectedTheater.MovieTheaterNumber;
                const sameHour = sala.hour === selectedTheater.hour;

                return sameMovie && sameNumber && sameHour ? selectedTheater : sala;
            });

            if (typeof window !== 'undefined') {
                window.localStorage.setItem('movieTheaters', JSON.stringify(nextState));
            }

            return nextState;
        },
        addTheatersForMovie: (state, action: PayloadAction<number>) => {
            const nextState = [...state, ...buildSalasForMovie(action.payload)];
            if (typeof window !== 'undefined') {
                window.localStorage.setItem('movieTheaters', JSON.stringify(nextState));
            }
            return nextState;
        },
        removeTheatersForMovie: (state, action: PayloadAction<number>) => {
            const nextState = state.filter((sala) => sala.movieId !== action.payload);
            if (typeof window !== 'undefined') {
                window.localStorage.setItem('movieTheaters', JSON.stringify(nextState));
            }
            return nextState;
        }
    }
});

export const { cambioSala, addTheatersForMovie, removeTheatersForMovie } = movieTheatherSlice.actions;

export const { syncSelectedTheater } = movieTheatherSlice.actions;

export default movieTheatherSlice.reducer;