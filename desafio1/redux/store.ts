import {configureStore} from '@reduxjs/toolkit'; 
import movieReducer from './slices/peliculasSlices'
import movieTheatherReducer from './slices/salasSlice'
import selectmovieTheatherReducer from './slices/selectSalaSlice';
import  reservationReducer  from './slices/reservaSlice';

const store = configureStore({
    reducer : { 
        //seat : seatsReducer, 
        movie : movieReducer,
        //line : lineReducer, 
       movieTheather: movieTheatherReducer,
       selectmovieTheather: selectmovieTheatherReducer, 
       reservation : reservationReducer
    }
}); 


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store; 