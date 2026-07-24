import { useAppSelector, useAppDispatch } from '@/redux/hooks'
import {limpiarSeleccion} from '@/redux/slices/reservaSlice'
import { limpiarAsientos , cerrarAsiento} from '@/redux/slices/selectSalaSlice';
import {agregarCompra, guardarCompra} from '@/redux/slices/comprassSlice'
import { Seat } from '@/types/asiento';
import { seleccionar } from "@/redux/slices/selectSalaSlice";
import { ticketsBuy } from "@/types/reserva";

export default function BuyingSeats(){
    const dispatcher = useAppDispatch(); 

    
    const boleteria = useAppSelector((state)=> state.reservation)
    const listadoAsiento: Seat[] = boleteria.seats; 
    const compras = useAppSelector((state)=> state.compras)

    const limpiar = ()=>{ 
        console.log(listadoAsiento)
        listadoAsiento.map((e)=>dispatcher(limpiarAsientos(e)) ); 
        
        dispatcher(limpiarSeleccion([])); 
    }
    const realizarCompra = ()=>{
        listadoAsiento.map(((e)=>dispatcher(cerrarAsiento(e))))

        dispatcher(agregarCompra(boleteria))
        dispatcher(guardarCompra(null))
        dispatcher(limpiarSeleccion([])); 
        dispatcher(seleccionar({
            MovieTheaterNumber: 0,
            lines: [],
            movieId: 0
        }))
    }
    return(
        <div className="flex bg-gray-200 w-xs h-dvh p-2 flex-col gap-4">
            <div className="flex border-b-1 border-solid  h-20 text=center text-lg items=center p-8 justify-center">
                <h2 className="font-bold">Compra de boletos</h2>
            </div>
            <div className="flex=1 flex flex-col gap-2 scrollbar-thin overflow-auto h-3/4">

                {
                    boleteria.seats.map((e)=>{
                        return (
                            <div className=" flex justify-between items-center p-2 bg-white rounded-sm shadow-sm" key={e.name}>
                                <div className="border-box text-center text-white bg-gray-700 rounded-2xl p-2 py-4 " style={{width: '50px'}}>
                                    <p>{e.name}</p>
                                </div>
                                <div>
                                    Asiento basico
                                     <br />
                                    Nombre de pelicula 
                                    <br></br>
                                    $3.55 x 1
                                </div>
                            <span>🗑️</span>
                        </div>
                        )
                    })
                }
            </div>
            <div className="flex-1 flex flex-col gap-4">
                <button className="bg-green-400 p-4 text-white rounded-lg hover:bg-green-700 hover:cursor-pointer" 
                onClick={realizarCompra}>
                    Confirmar Compra
                    </button>

                <button className="bg-red-400 p-4 text-white rounded-lg hover:bg-red-700 hover:cursor-pointer" onClick={limpiar}>
                    Limpiar Carrito</button>
            </div>
            
        </div>
    );
}