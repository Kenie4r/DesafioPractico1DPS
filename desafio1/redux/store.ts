import {configureStore} from '@reduxjs/toolkit'; 
import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';
import movieReducer from './slices/peliculasSlices'
import movieTheatherReducer from './slices/salasSlice'
import { syncSelectedTheater } from './slices/salasSlice';
import selectmovieTheatherReducer from './slices/selectSalaSlice';
import { seleccionar, usarAsiento, limpiarAsientos, cerrarAsiento } from './slices/selectSalaSlice';
import  reservationReducer  from './slices/reservaSlice';
import  comprasReducer  from './slices/comprassSlice';

const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
    matcher: isAnyOf(seleccionar, usarAsiento, limpiarAsientos, cerrarAsiento),
    effect: (_action, listenerApi) => {
        const state = listenerApi.getState() as {
            selectmovieTheather: {
                lines: unknown[];
                movieId: number;
                MovieTheaterNumber: number;
                hour: string;
            };
        };

        const selectedTheater = state.selectmovieTheather;

        if (!selectedTheater || selectedTheater.movieId === 0) {
            return;
        }

        listenerApi.dispatch(syncSelectedTheater(selectedTheater));
    }
});

const store = configureStore({
    reducer : { 
        //seat : seatsReducer, 
        movie : movieReducer,
        //line : lineReducer, 
       movieTheather: movieTheatherReducer,
       selectmovieTheather: selectmovieTheatherReducer, 
       reservation : reservationReducer, 
       compras: comprasReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().prepend(listenerMiddleware.middleware)
}); 


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store; 