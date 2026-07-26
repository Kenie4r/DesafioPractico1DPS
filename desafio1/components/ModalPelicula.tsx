import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { seleccionar } from '@/redux/slices/selectSalaSlice';
import type { Movie } from '@/types/pelicula';
import type { MovieTheather } from '@/types/Sala';

interface ModalPelicualProps {
  pelicula?: Movie;
  closeDetails: () => void;
}

export default function ModalPelicula({ pelicula, closeDetails }: ModalPelicualProps) {
  const dispatch = useAppDispatch();
  const movieTheathers = useAppSelector((state) => state.movieTheather.filter((e) => e.movieId === pelicula?.id));

  if (!pelicula) return null;

  const seleccionarSala = (sala: MovieTheather) => {
    dispatch(seleccionar(sala));
  };

  return (
    <div className="fixed inset-0 z-[1000000] flex items-center justify-center bg-slate-950/70 p-2 sm:p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[24px] bg-white shadow-2xl">
        <button
          type="button"
          onClick={closeDetails}
          className="absolute right-4 top-4 z-10 rounded-full bg-white/90 p-2 text-slate-700 shadow-sm transition hover:bg-white"
          aria-label="Cerrar modal"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.5 9.50002L9.5 14.5M9.49998 9.5L14.5 14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C21.5093 4.43821 21.8356 5.80655 21.9449 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>

        <div className="grid gap-5 p-4 sm:p-6 lg:grid-cols-[220px_1fr] lg:p-8">
          <div className="overflow-hidden rounded-2xl shadow-md">
            <img src={pelicula.image} alt={pelicula.title} className="h-full min-h-[260px] w-full object-cover sm:min-h-[300px]" />
          </div>

          <div className="flex flex-col gap-5">
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">{pelicula.genre}</span>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">{pelicula.duration} min</span>
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-700">Dir. {pelicula.author}</span>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <h3 className="font-semibold text-slate-800">Sinopsis</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{pelicula.description}</p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button type="button" className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700">
                ▶️ Ver trailer
              </button>
              <button type="button" className="rounded-xl bg-slate-800 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-900">
                🎬 Más información
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-200 bg-slate-50 px-4 py-4 sm:px-6 sm:py-5">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-800">Horarios de funciones</h3>
            <span className="text-sm text-slate-500">{movieTheathers.length} opciones</span>
          </div>

          {movieTheathers.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-4 text-sm text-slate-500">
              No hay funciones disponibles para esta película por el momento.
            </div>
          ) : (
            <div className="space-y-3">
              {movieTheathers.map((e) => (
                <button
                  key={`${e.MovieTheaterNumber}-${e.hour}`}
                  type="button"
                  onClick={() => seleccionarSala(e)}
                  className="flex w-full flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-red-400 hover:shadow-md"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-800 text-sm font-semibold text-white">
                        S{e.MovieTheaterNumber}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-800">Sala {e.MovieTheaterNumber}</p>
                        <p className="text-sm text-slate-500">Función {e.hour}</p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">DOB</span>
                      <span className="rounded-full bg-rose-100 px-3 py-1 text-sm font-medium text-rose-700">+18</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}