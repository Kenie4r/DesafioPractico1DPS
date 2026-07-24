
import {salasData} from '@/data/salasData'; 
import LineMovie from './PeliculaFila';
import { MovieTheather } from '@/types/Sala';
import { useAppSelector, useAppDispatch } from '@/redux/hooks'

interface MovieTheatherProps{
    movieTheather : MovieTheather; 
}


export default function MovieTheaterGrid ({movieTheather} : MovieTheatherProps){
 
    return (
        <div>
            <div className="p-8">
                <div className="border-t-10 border-solid border-gray-700 text-center rounded-xl">
                
                    <p className="font-bold text-lg"> Sala #{movieTheather?.MovieTheaterNumber}</p>
                </div>
            </div>
            <div>
                {movieTheather?.lines.map((e) =>{
                    return (<LineMovie lineMovie={e} key={e.lineNumber}/>)
                })}
            </div>
            
        </div>
    ); 
} 