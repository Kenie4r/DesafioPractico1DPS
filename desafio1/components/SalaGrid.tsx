
import {salasData} from '@/data/salasData'; 
import LineMovie from './PeliculaFila';


export default function MovieTheaterGrid (){
    return (
        <div>
            <div className="p-8">
                <div className="border-t-10 border-solid border-gray-700 text-center rounded-xl">
                
                    <p className="font-bold text-lg"> Sala #{salasData[2]?.MovieTheaterNumber}</p>
                </div>
            </div>
            <div>
                {salasData[2]?.lines.map((e) =>{
                    return (<LineMovie lineMovie={e} key={e.lineNumber}/>)
                })}
            </div>
            
        </div>
    ); 
} 