import { createSlice } from "@reduxjs/toolkit";
import type { ticketsBuy } from "@/types/reserva";

const STORAGE_KEY = "comprasDPS";

const loadComprasFromStorage = (): ticketsBuy[] => {

    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
        return [];
    }

    try {
        const parsed = JSON.parse(stored);
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
};

const initialState: ticketsBuy[] = loadComprasFromStorage();

export const comprasSlice = createSlice({
    name: "compras",
    initialState,
    reducers: {
        agregarCompra: (state, action: { payload: ticketsBuy }) => {
            state.push(action.payload);
        },
        guardarCompra: (state) => {
            if (typeof window !== "undefined") {
                window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
            }
        }
    }
});

export const { agregarCompra, guardarCompra } = comprasSlice.actions;
export default comprasSlice.reducer;