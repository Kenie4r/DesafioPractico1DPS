import { createSlice } from "@reduxjs/toolkit";
import type {MovieTheather} from '@/types/Sala'; 
//import {salasData} from '@/data/salasData'; 
import { defaultSerializeQueryArgs } from "@reduxjs/toolkit/query";
import { ticketsBuy } from "@/types/reserva";

const initState : ticketsBuy  = {
    movieId: 0 , 
    price: 0 , 
    seats: [], 
    theatherId: 0
};

export const reservationSlice = createSlice({
    name: 'reservationSlice', 
    initialState: initState,
    reducers: {
        iniciarReserva : (state, action)=> 
        {
            return action.payload
        },
        seleccionAsiento : (state, action)=>{
         const asientoSeleccionado = action.payload;

            const index = state.seats.findIndex(            s => s.name === asientoSeleccionado.name);
             console.log('prueba : ' + index)
            if (index === -1) {
                    console.log('prueba : ' + asientoSeleccionado)
                state.seats.push(asientoSeleccionado);
            } else {
                state.seats.splice(index, 1);
            }

            console.log(state.seats.length);
        }
    }
})


export const {iniciarReserva,seleccionAsiento} = reservationSlice.actions;
export default reservationSlice.reducer;