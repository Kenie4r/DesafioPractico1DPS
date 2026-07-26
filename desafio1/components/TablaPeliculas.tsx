'use client';

import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { deleteMovie } from '@/redux/slices/peliculasSlices';
import { removeTheatersForMovie } from '@/redux/slices/salasSlice';
import type { Movie } from '@/types/pelicula';

type TablaPeliculasProps = {
  onEdit: (pelicula: Movie) => void;
};

export default function TablaPeliculas({ onEdit }: TablaPeliculasProps) {
  const dispatch = useAppDispatch();
  const peliculas = useAppSelector((state) => state.movie);
  const [peliculaDetalle, setPeliculaDetalle] = useState<Movie | null>(null);
  const [busqueda, setBusqueda] = useState('');
  const [filtroGenero, setFiltroGenero] = useState('Todos');
  const [filtroEstado, setFiltroEstado] = useState('Todos');

  const generos = Array.from(new Set(peliculas.map((pelicula) => pelicula.genre)));
  const estados = Array.from(new Set(peliculas.map((pelicula) => pelicula.status)));

  const peliculasFiltradas = peliculas.filter((pelicula) => {
    const coincideBusqueda =
      pelicula.title.toLowerCase().includes(busqueda.toLowerCase()) ||
      pelicula.genre.toLowerCase().includes(busqueda.toLowerCase()) ||
      pelicula.status.toLowerCase().includes(busqueda.toLowerCase());

    const coincideGenero = filtroGenero === 'Todos' || pelicula.genre === filtroGenero;
    const coincideEstado = filtroEstado === 'Todos' || pelicula.status === filtroEstado;

    return coincideBusqueda && coincideGenero && coincideEstado;
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-800">Películas registradas</h2>
          <p className="text-sm text-slate-500">Busca y filtra por género o estado.</p>
        </div>
        <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
          {peliculasFiltradas.length} de {peliculas.length} elementos
        </span>
      </div>

      <div className="grid gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 md:grid-cols-[1.4fr_0.8fr_0.8fr]">
        <label className="text-sm font-medium text-slate-700">
          <span className="mb-1 block">Buscar</span>
          <input
            type="text"
            value={busqueda}
            onChange={(event) => setBusqueda(event.target.value)}
            placeholder="Título, género o estado"
            className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-blue-500"
          />
        </label>

        <label className="text-sm font-medium text-slate-700">
          <span className="mb-1 block">Género</span>
          <select
            value={filtroGenero}
            onChange={(event) => setFiltroGenero(event.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-blue-500"
          >
            <option value="Todos">Todos</option>
            {generos.map((genero) => (
              <option key={genero} value={genero}>
                {genero}
              </option>
            ))}
          </select>
        </label>

        <label className="text-sm font-medium text-slate-700">
          <span className="mb-1 block">Estado</span>
          <select
            value={filtroEstado}
            onChange={(event) => setFiltroEstado(event.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-blue-500"
          >
            <option value="Todos">Todos</option>
            {estados.map((estado) => (
              <option key={estado} value={estado}>
                {estado}
              </option>
            ))}
          </select>
        </label>
      </div>

      {peliculas.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 p-6 text-center text-slate-500">
          Aún no hay películas registradas.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="min-w-full divide-y divide-slate-200 text-sm">
            <thead className="bg-gray-400 text-white">
              <tr>
                <th className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700">Título</th>
                <th className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700">Género</th>
                <th className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700">Estado</th>
                <th className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {peliculasFiltradas.map((pelicula) => (
                <tr key={pelicula.id} className="hover:bg-slate-50">
                  <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm text-slate-800">{pelicula.title}</td>
                  <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm text-slate-600">{pelicula.genre}</td>
                  <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm text-slate-600">{pelicula.status}</td>
                  <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => setPeliculaDetalle(pelicula)}
                        className="rounded-lg bg-blue-600 px-3 py-1.5 font-semibold text-white hover:bg-blue-700"
                      >
                        Ver
                      </button>
                      <button
                        type="button"
                        onClick={() => onEdit(pelicula)}
                        className="rounded-lg bg-amber-500 px-3 py-1.5 font-semibold text-white hover:bg-amber-600"
                      >
                        Editar
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          dispatch(deleteMovie(pelicula.id));
                          dispatch(removeTheatersForMovie(pelicula.id));
                        }}
                        className="rounded-lg bg-rose-600 px-3 py-1.5 font-semibold text-white hover:bg-rose-700"
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {peliculaDetalle && (
        <div className="fixed inset-0 z-[1000000] flex items-center justify-center bg-gray-800/60 p-4">
          <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-xl font-semibold text-slate-800">{peliculaDetalle.title}</h3>
                <p className="text-sm text-slate-500">{peliculaDetalle.genre} • {peliculaDetalle.duration} min</p>
              </div>
              <button
                type="button"
                onClick={() => setPeliculaDetalle(null)}
                className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700"
              >
                Cerrar
              </button>
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-[180px_1fr]">
              <img src={peliculaDetalle.image} alt={peliculaDetalle.title} className="h-56 w-full rounded-xl object-cover" />
              <div className="space-y-3 text-sm text-slate-600">
                <div>
                  <p className="font-semibold text-slate-800">Descripción</p>
                  <p>{peliculaDetalle.description}</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-800">Director / Autor</p>
                  <p>{peliculaDetalle.author}</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-800">Estado</p>
                  <p>{peliculaDetalle.status}</p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  onEdit(peliculaDetalle);
                  setPeliculaDetalle(null);
                }}
                className="rounded-lg bg-amber-500 px-4 py-2 font-semibold text-white hover:bg-amber-600"
              >
                Editar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
