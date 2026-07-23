import {configureStore} from '@reduxjs/toolkit'; 
import movieReducer from './peliculaSlices'

const store = configureStore({
    reducer : { 
        //seat : seatsReducer, 
        movie : movieReducer,
        //line : lineReducer, 
       // movieTheather: movieTheatherReducer,
    }
}); 


export default store; 