'use client';
import SeatBase from "@/components/AsientosBase";
import MovieGrid from "@/components/MovieGrid";
import Image from "next/image";
import { Seat } from "@/types/asiento";
import MovieTheaterGrid from "@/components/SalaGrid";



export default function Home() {
  return (
    <div >
      <main className="w-full ">
          <MovieTheaterGrid/>
      </main>
    </div>
  );
}
