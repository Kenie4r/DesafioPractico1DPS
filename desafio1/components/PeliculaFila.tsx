'use client';
import { Seat } from "@/types/asiento";
import { Line } from "@/types/fila";
import SeatBase from "./AsientosBase";
import { usarAsiento } from "@/redux/slices/selectSalaSlice";
import {seleccionAsiento} from '@/redux/slices/reservaSlice'
import { useAppSelector, useAppDispatch } from '@/redux/hooks'

interface LineProps{
    lineMovie : Line;
}






export default function LineMovie({lineMovie} : LineProps){
    const dispatch = useAppDispatch();
    
    const seleccionarAsiento = (asiento: Seat)=> {
          dispatch(usarAsiento(asiento));
        dispatch(seleccionAsiento(asiento));
    }
    return (
        <div className="flex gap-2 py-2 w-full items-center justify-center">
            <span>{lineMovie.lineNumber}</span>
            {lineMovie.seats.map((e)=>{
                return (<SeatBase key={e.name} asiento={e} seleccionarAsiento={()=>{seleccionarAsiento(e)}}/> )
            })}
        </div>
    ); 
}