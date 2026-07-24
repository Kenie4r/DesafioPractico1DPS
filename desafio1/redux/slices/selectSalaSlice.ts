import { createSlice } from "@reduxjs/toolkit";
import type { MovieTheather } from '@/types/Sala';
import { Seat } from "@/types/asiento";
import { Line } from "@/types/fila";

const initialValue: MovieTheather = {
    lines: [],
    movieId: 0,
    MovieTheaterNumber: 0,
};

export const selectmovieTheatherSlice = createSlice({
    name: 'selectMovieTheater',
    initialState: initialValue,
    reducers: {
        seleccionar: (_state, action) => {
            return action.payload;
        },
        usarAsiento: (state, action)=> {
            const asientoSeleccionado: Seat = action.payload;

            const linea = state.lines.find(l => l.lineNumber === asientoSeleccionado.name[0]);

            if (!linea) return;

            const asiento = linea.seats.find(s => s.name === asientoSeleccionado.name);

            if (!asiento) return;

            if (asiento.status === "activo") {
                asiento.status = "seleccionado";
            } else if (asiento.status === "seleccionado") {
                asiento.status = "activo";
            }
            //return action.payload;

        }
    },
});

export const { seleccionar,usarAsiento } = selectmovieTheatherSlice.actions;
export default selectmovieTheatherSlice.reducer;