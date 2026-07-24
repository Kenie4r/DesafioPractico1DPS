import { Movie } from "@/types/pelicula";

import { useAppSelector, useAppDispatch } from '@/redux/hooks'
import { MovieTheather } from "@/types/Sala";
import MovieTheaterGrid from "./SalaGrid";
import BuyingSeats from "./compraBarra";
import { seleccionar } from "@/redux/slices/selectSalaSlice";
import {iniciarReserva} from '@/redux/slices/reservaSlice'
import { useEffect } from "react";

interface ModalAsientos{
   // movieTheather : MovieTheather| undefined; 
   // closeDetails :  () =>void; 
    //selectTheather: ()=> void;
}



export default function  ModalAsientos(//{movieTheather, closeDetails} : ModalAsientos
    ){
    ///if (pelicula === undefined)
    //    return null; 

   
    const salaSeleccionada = useAppSelector((state)=>state.selectmovieTheather)
    const peliculaSeleccionada = useAppSelector((state)=> state.movie.find((e)=>e.id==salaSeleccionada.movieId))
    const dispatch = useAppDispatch();


             
    useEffect(() => {
        dispatch(iniciarReserva({
            movieId: salaSeleccionada.movieId,
            price: 0,
            seats: [],
            theatherId: salaSeleccionada.MovieTheaterNumber
        }));
    }, [dispatch, salaSeleccionada.movieId, salaSeleccionada.MovieTheaterNumber]);

    const isEmptySelection = !salaSeleccionada ||
        (salaSeleccionada.lines.length === 0 &&
         salaSeleccionada.movieId === 0 &&
         salaSeleccionada.MovieTheaterNumber === 0)

    if (isEmptySelection) {
        return null;
    }

    const cerrarSeleccion = ()=> {
          dispatch(seleccionar({lines : [],
    movieId: 0, 
    MovieTheaterNumber: 0}));
    }

   
    /*dispatch(iniciarReserva({
          movieId: salaSeleccionada.movieId , 
            price: 0 , 
            seats: [], 
            theatherId: salaSeleccionada.MovieTheaterNumber
    }));*/

    //const movieTheathers = useAppSelector((state)=> state.movieTheather.filter((e)=> e.movieId == pelicula.id)); 
    return (
        <div className="fixed bg-gray-800/50 w-full h-full top-0 rigth-0
            flex flex-1 justify-center items-center"> 
            <div className=" relative w-11/12  gap-2 bg-white h-hv rounded-lg shadow-xl m-4 "> 
                <div className="flex flex-row justify-between ">
                    <div className="p-8 flex items-center justify-center flex-1 flex-col">
                        <h2 className="text-2xl">{peliculaSeleccionada?.title} - 7:30</h2>
                        <MovieTheaterGrid movieTheather={salaSeleccionada}/>
                    </div>
                    
                    <BuyingSeats/>
                </div>
                <div className="absolute top-0 left-0 text-lg p-4 hover:cursor-pointer " onClick={cerrarSeleccion}>
                    🔙
                </div>
            </div>
        </div>

    ); 
}