'use client';

import MovieCard from './PeliculaCard';
import { useMemo, useState } from 'react';
import type { Movie } from '@/types/pelicula';
import ModalPelicula from './ModalPelicula';
import { useAppSelector } from '@/redux/hooks';

export default function MovieGrid() {
  const peliculas = useAppSelector((state) => state.movie);
  const [peliculaSeleccionada, setPeliculaSeleccionada] = useState<Movie | undefined>(undefined);

  const peliculasHabilitadas = useMemo(
    () => peliculas.filter((pelicula) => pelicula.status === 'En cartelera'),
    [peliculas]
  );
  const proximosEstrenos = useMemo(
    () => peliculas.filter((pelicula) => pelicula.status === 'Próximamente'),
    [peliculas]
  );

  const renderSection = (title: string, items: Movie[]) => (
    <section className="w-full">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-800">{title}</h2>
        <span className="text-sm text-slate-500">{items.length} películas</span>
      </div>
      <div className="flex gap-4 overflow-x-auto pb-4">
        {items.map((pelicula) => (
          <div key={pelicula.id} className="min-w-[220px] max-w-[220px] flex-shrink-0">
            <MovieCard pelicula={pelicula} showDetails={() => setPeliculaSeleccionada(title=='En cartelera'?pelicula:undefined)} />
          </div>
        ))}
      </div>
    </section>
  );

  return (
    <div className="w-full space-y-8 p-4 sm:p-8">
      {renderSection('En cartelera', peliculasHabilitadas)}
      {renderSection('Próximamente', proximosEstrenos)}

      <ModalPelicula
        closeDetails={() => setPeliculaSeleccionada(undefined)}
        pelicula={peliculaSeleccionada}
      />
    </div>
  );
}