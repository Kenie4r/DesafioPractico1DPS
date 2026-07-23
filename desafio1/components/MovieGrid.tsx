'use client';

import MovieCard from './PeliculaCard';
import { useState } from 'react';
import { Movie } from '@/types/pelicula';
import ModalPelicula from './ModalPelicula';



const showDetailsMovie = ()=> { 
    return null;
}

export default function MovieGrid(){

    const peliculas = useSelector(state => state.movie); 
  
    const [peliculaSeleccionada, setPeliculaSeleccionada] = useState<Movie | undefined >(undefined);

    return (
        <div className='grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-8'> 
            {peliculas.map((e)=> {
                return(<MovieCard key={e.id}  pelicula={e} showDetails={()=> {setPeliculaSeleccionada(e)}}/>)
            })}

            <ModalPelicula closeDetails={()=>{setPeliculaSeleccionada(undefined)}} pelicula={peliculaSeleccionada}/>

        </div>
    ); 
}