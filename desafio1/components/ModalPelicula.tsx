import { Movie } from "@/types/pelicula";

interface ModalPelicualProps{
    pelicula : Movie; 
    closeDetails :  () =>void; 
}

export default function  ModalPelicula({pelicula, closeDetails} : ModalPelicualProps){
    if (pelicula === undefined)
        return null; 
    return (
        <div className="fixed bg-gray-800/50 w-full h-full top-0 rigth-0
            flex flex-1 justify-center items-center"> 

            <div className=" relative w-3xl  gap-4 bg-white h-2xl rounded-lg shadow-xl"> 
                <div className="absolute top-0 right-0 p-2 hover:cursor-pointer" onClick={closeDetails}>❌</div>
                <div className="flex p-8 gap-8">
                    <img src={pelicula.image} alt={pelicula.title}
                    className="fle-none w-62"/>
                    <div className="flex-1">
                        <div className="h-64">
                            <h2  className="block font-semibold">{pelicula.title}</h2>
                            <p>
                                {pelicula.description}
                            </p>
                        </div>
                        

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
                <div className="p-4">
                    <span className="border-t-2 border-b-2 border-solid  
                    
                    p-3 block font-semibold">Horarios de funciones</span>
                    <div className="flex gap-4 p-2 items-center hover:bg-red-400 hover:text-white hover:cursor-pointer">
                        <div className="p-2 text-center bg-gray-600 rounded-2xl ">
                            <span className=" text-white
                        ">Sala 
                                <br />7</span>

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
                    </div>
                   
                </div>

            </div>
        </div>

    ); 
}