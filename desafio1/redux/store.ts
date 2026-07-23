import {configureStore} from '@reduxjs/toolkit'; 
import movieReducer from './slices/peliculasSlices'

const store = configureStore({
    reducer : { 
        //seat : seatsReducer, 
        movie : movieReducer,
        //line : lineReducer, 
       // movieTheather: movieTheatherReducer,
    }
}); 


export default store; 