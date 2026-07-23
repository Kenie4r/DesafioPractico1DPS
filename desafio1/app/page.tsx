'use client';
import SeatBase from "@/components/AsientosBase";
import MovieGrid from "@/components/MovieGrid";
import Image from "next/image";
import { Seat } from "@/types/asiento";
import MovieTheaterGrid from "@/components/SalaGrid";
import {Provider} from 'react-redux'; 
import store from '@/redux/store'
import { useAppSelector, useAppDispatch } from '@/redux/hooks'




export default function Home() {

  //const movies = useSelector(state => state.movie); 
  
  return (
    <Provider store={store}> 
    <div >
      <main className="w-full ">
          <MovieGrid/>
      </main>
    </div>
    </Provider>
  );
}
