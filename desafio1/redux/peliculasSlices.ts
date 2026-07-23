import {createSlice} from '@reduxjs/toolkit'
 import type { PayloadAction } from '@reduxjs/toolkit'
import type {Movie} from '@/types/pelicula'
import {peliculas} from '@/data/data.js'; 

export const movieSlice = createSlice({
    initialState: Movie[...peliculas], 
    reducers: {}
}); 

export default movieSlice.reducer;