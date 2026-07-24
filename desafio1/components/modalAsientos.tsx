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

         console.log(salaSeleccionada);
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
            flex flex-1 justify-center items-center" style={{zIndex: '1000001'}}> 
            <div className=" relative w-11/12  gap-2 bg-white h-hv rounded-lg shadow-xl m-4 "> 
                <div className="flex flex-row justify-between ">
                    <div className="p-8 flex items-center justify-center flex-1 flex-col">
                        <h2 className="text-2xl">{peliculaSeleccionada?.title} - 7:30</h2>
                        <MovieTheaterGrid movieTheather={salaSeleccionada}/>
                    </div>
                    
                    <BuyingSeats/>
                </div>
                <div className="absolute top-0 left-0 text-lg p-4 hover:cursor-pointer " onClick={()=> cerrarSeleccion}>
                    <svg className="w-6 h-6 mb-2 mx-auto" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M9.00002 15.3802H13.92C15.62 15.3802 17 14.0002 17 12.3002C17 10.6002 15.62 9.22021 13.92 9.22021H7.15002" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M8.57 10.7701L7 9.19012L8.57 7.62012" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                </div>
            </div>
        </div>

    ); 
}