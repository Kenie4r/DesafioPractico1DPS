import { Movie } from "@/types/pelicula";
import { useAppSelector, useAppDispatch } from '@/redux/hooks'
import { MovieTheather } from "@/types/Sala";
import { seleccionar } from "@/redux/slices/selectSalaSlice";
interface ModalPelicualProps{
    pelicula ?: Movie; 
    closeDetails :  () =>void; 
    //selectTheather: ()=> void;
}

export default function  ModalPelicula({pelicula, closeDetails} : ModalPelicualProps){
    const dispatch = useAppDispatch();
    const movieTheathers = useAppSelector((state)=> state.movieTheather.filter((e)=> e.movieId == pelicula?.id)); 

    if (pelicula === undefined)
        return null; 

    const seleccionarSala = (sala: MovieTheather)=>{
        console.log(sala)
        dispatch(seleccionar(sala));
    }

    //setSalaSeleccionada(movieTheathers[0]);
    return (
        <div className="fixed bg-gray-800/50 w-full h-full top-0 rigth-0
            flex flex-1 justify-center items-center" style={{zIndex: '1000000'}}> 

            <div className=" relative w-3xl  gap-4 bg-white h-2xl rounded-lg shadow-xl m-4"> 
                <div className="absolute top-0 right-0 p-2 hover:cursor-pointer" onClick={closeDetails}>
                    <svg className="w-6 h-6 mb-2 mx-auto" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M14.5 9.50002L9.5 14.5M9.49998 9.5L14.5 14.5" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"></path> <path d="M22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C21.5093 4.43821 21.8356 5.80655 21.9449 8" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"></path> </g></svg>

                </div>
                <div className="flex p-8 gap-8">
                    <img src={pelicula.image} alt={pelicula.title}
                    className="fle-none w-62"/>
                    <div className="flex-1 flex flex-col gap-4">
                        <div className="h-48 scroll-smooth wrap-anywhere  text-clip scrollbar-thin overflow-auto">
                            <h2  className="block font-semibold">{pelicula.title}</h2>
                            <p >
                                {pelicula.description}
                            </p>
                        </div>
                        Director:
                        <span className="bg-green-400/50 text-green-700 py-2 px-4 rounded font-semibold" >{pelicula.author}</span >
                    </div>
                </div>
                <div className="flex justify-center gap-4">
                    <button className="bg-blue-600 text-white p-2 rounded">
                        ▶️ Video
                    </button>
                    <button className="bg-blue-600 text-white p-2 rounded"> 
                        Trailers
                    </button>
                </div>
                <div className="p-4 ">
                    <span className="border-t-2 border-b-2 border-solid  
                    
                    p-3 block font-semibold">Horarios de funciones</span>
                    <div className="scrollbar-thin overflow-auto h-48">

                    
                    {movieTheathers.map((e)=> { 
                           return(<div key={e.MovieTheaterNumber} className="flex gap-4 p-2 items-center hover:bg-red-400 hover:text-white hover:cursor-pointer" 
                           onClick={() => seleccionarSala(e)}>
                        <div className="p-2 text-center bg-gray-600 rounded-2xl ">
                            <span className=" text-white">Sala 
                                <br />{e.MovieTheaterNumber}</span>

                        </div>
                        <div className="flex-1">
                            Hora de funcion: 7:30 PM
                        </div>
                        <div className="flex text-white gap-4">
                            <div className="p-2 text-center bg-gray-600 rounded-2xl ">
                                DOB
                            </div>
                            <div className="p-2 text-center bg-gray-600 rounded-2xl ">
                                +18
                            </div>
                        </div>
                    </div>) 

                    })}
                    </div>                
                </div>

            </div>
            
        </div>

    ); 
}