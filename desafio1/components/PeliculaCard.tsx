import { Movie } from "@/types/pelicula";
import { url } from "inspector";

interface MovieProps{ 
    pelicula: Movie; 
    showDetails: ()=>{};
}



export default function MovieCard({pelicula, showDetails} : MovieProps){
    return (
        <div  onClick={() => {showDetails()}}
        style={{background: `url(${pelicula.image})`}} className="min-w-48 min-h-48 w-full 
       box-content relative 
        rounded-md shadow-xl sm:h-64 sm:w-64 " > 
           
            <p className="flex-1 bg-white absolute bottom-0 left-0 w-full  p-4">{pelicula.title}</p>
        </div>
    ); 
}