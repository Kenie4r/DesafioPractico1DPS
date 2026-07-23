import { Seat } from "@/types/asiento";
import { Line } from "@/types/fila";
import SeatBase from "./AsientosBase";

interface LineProps{
    lineMovie : Line;
}

const seleccionarAsiento  = (asiento : Seat)=>{
    if (asiento.status ==    'activo' ) 
        asiento.status = 'seleccionado';
    else if (asiento.status == 'seleccionado'     ) 
        asiento.status = 'activo';
}



export default function LineMovie({lineMovie} : LineProps){
    return (
        <div className="flex gap-2 py-2 w-full items-center justify-center">
            <span>{lineMovie.lineNumber}</span>
            {lineMovie.seats.map((e)=>{
                return (<SeatBase key={e.name} asiento={e} seleccionarAsiento={()=>{seleccionarAsiento(e)}}/> )
            })}
        </div>
    ); 
}