'use client';

import { useState } from 'react';
import FormularioPelicula from '@/components/FormularioPelicula';
import TablaPeliculas from '@/components/TablaPeliculas';
import NavigationBarSS from '@/components/BarraNavegacion';
import type { Movie } from '@/types/pelicula';

export default function PeliculasPage() {
  const [peliculaSeleccionada, setPeliculaSeleccionada] = useState<Movie | null>(null);
  const [modalAbierto, setModalAbierto] = useState(false);

  const abrirModal = (pelicula?: Movie) => {
    setPeliculaSeleccionada(pelicula ?? null);
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setPeliculaSeleccionada(null);
    setModalAbierto(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 pb-24">
      <div className="mx-auto max-w-6xl space-y-8">

        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-slate-800">Películas</h2>
            </div>
            <button
              type="button"
              onClick={() => abrirModal()}
              className="rounded-xl bg-blue-600 px-4 py-2.5 font-semibold text-white shadow-sm transition hover:bg-blue-700"
            >
              Agregar película
            </button>
          </div>
          <TablaPeliculas onEdit={(pelicula) => abrirModal(pelicula)} />
        </div>

        {modalAbierto && (
          <div className="fixed inset-0 z-[1000000] flex items-center justify-center bg-gray-800/60 p-4">
            <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-semibold text-slate-800">
                    {peliculaSeleccionada ? 'Editar película' : 'Agregar película'}
                  </h3>
                  <p className="text-sm text-slate-500">
                    {peliculaSeleccionada ? 'Modifica los datos de la película.' : 'Completa los datos para registrar una nueva película.'}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={cerrarModal}
                  className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700"
                >
                  Cerrar
                </button>
              </div>

              <div className="mt-4">
                <FormularioPelicula pelicula={peliculaSeleccionada} onCancel={cerrarModal} />
              </div>
            </div>
          </div>
        )}
      </div>

      <NavigationBarSS />
    </div>
  );
}
