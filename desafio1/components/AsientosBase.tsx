import { Seat } from "@/types/asiento";

interface SeatProps{ 
    asiento?: Seat; 
    seleccionarAsiento:()=>{}
}

const colorAsiento: Record<string, string> = {
    'activo' : 'bg-gray-500 hover:cursor-pointer', 
    'inactivo' : 'bg-red-500 hover:cursor-not-allowed', 
    'n/a' : 'bg-white hover:cursor-default', 
    'preseleccionado' : 'bg-blue-500 hover:cursor-default',
    'seleccionado': 'bg-green-500 hover:cursor-default'
}

export default function SeatBase({asiento, seleccionarAsiento} : SeatProps){ 
    if (asiento?.preferential){
        return (
        <div className={`${colorAsiento[asiento?.status]} text-white  p-2 rounded-2xl text-center `} style={{width: '45px'}}
            onClick={()=>{seleccionarAsiento()}}>
            {asiento?.name}
        </div>

        );    
    }
    
    return (
        <div className={`${colorAsiento[asiento?.status]} text-white  p-2 rounded-lg text-center `} style={{width: '45px'}}
            onClick={()=>{seleccionarAsiento()}}>
            {asiento?.name}
        </div>

    );
}