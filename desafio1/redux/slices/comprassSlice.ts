import { createSlice } from "@reduxjs/toolkit";
import type {MovieTheather} from '@/types/Sala'; 
//import {salasData} from '@/data/salasData'; 
import { defaultSerializeQueryArgs } from "@reduxjs/toolkit/query";
import { ticketsBuy } from "@/types/reserva";

const initState : ticketsBuy [] = [];

export const reservationSlice = createSlice({
    name: 'comprasSlice', 
    initialState: initState,
    reducers: {}
})

export default reservationSlice.reducer;