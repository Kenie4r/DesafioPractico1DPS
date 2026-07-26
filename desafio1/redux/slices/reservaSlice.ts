import { createSlice } from "@reduxjs/toolkit";
import type {MovieTheather} from '@/types/Sala'; 
//import {salasData} from '@/data/salasData'; 
import { defaultSerializeQueryArgs } from "@reduxjs/toolkit/query";
import { ticketsBuy } from "@/types/reserva";

const TICKET_PRICE = 3.5;

const initState : ticketsBuy  = {
    movieId: 0 , 
    price: 0 , 
    seats: [], 
    theatherId: 0,
    hour: ''
};

export const reservationSlice = createSlice({
    name: 'reservation', 
    initialState: initState,
    reducers: {
        iniciarReserva : (state, action)=> 
        {
            return action.payload
        },
        seleccionAsiento : (state, action)=>{
         const asientoSeleccionado = action.payload;

            if (asientoSeleccionado.status !== 'activo' && asientoSeleccionado.status !== 'seleccionado') {
                return;
            }

            const index = state.seats.findIndex(            s => s.name === asientoSeleccionado.name);
            if (index === -1) {
                state.seats.push(asientoSeleccionado);
            } else {
                state.seats.splice(index, 1);
            }

            state.price = state.seats.length * TICKET_PRICE;
        }, 
        limpiarSeleccion: (state, action)=> {
            state.seats = []; 
            state.price = 0;
        }
    }
})


export const {iniciarReserva,seleccionAsiento, limpiarSeleccion} = reservationSlice.actions;
export default reservationSlice.reducer;