import { createSlice } from "@reduxjs/toolkit";
import type {MovieTheather} from '@/types/Sala'; 
import {salasData} from '@/data/salasData'; 
import { defaultSerializeQueryArgs } from "@reduxjs/toolkit/query";




export const movieTheatherSlice = createSlice({
    name: 'movieTheater', 
    initialState: salasData,
    reducers: {
        cambioSala : (state, action)=>{ 
            return action.payload
        }

    }
})

export default movieTheatherSlice.reducer;