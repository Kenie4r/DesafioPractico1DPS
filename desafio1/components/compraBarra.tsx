import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { limpiarSeleccion } from '@/redux/slices/reservaSlice';
import { limpiarAsientos, cerrarAsiento } from '@/redux/slices/selectSalaSlice';
import { agregarCompra, guardarCompra } from '@/redux/slices/comprassSlice';
import type { Seat } from '@/types/asiento';
import { seleccionar } from '@/redux/slices/selectSalaSlice';

export default function BuyingSeats() {
  const dispatcher = useAppDispatch();
  const boleteria = useAppSelector((state) => state.reservation);
  const listadoAsiento: Seat[] = boleteria.seats;
  const peliculaSeleccionada = useAppSelector((state) => state.movie.find((pelicula) => pelicula.id === boleteria.movieId));
  const total = boleteria.total ?? listadoAsiento.length * 3.5;

  const limpiar = () => {
    listadoAsiento.forEach((e) => dispatcher(limpiarAsientos(e)));
    dispatcher(limpiarSeleccion([]));
  };

  const realizarCompra = () => {
    if (listadoAsiento.length === 0) return;

    const compraPayload = {
      ...boleteria,
      total: listadoAsiento.length * 3.5,
      price: listadoAsiento.length * 3.5,
      seats: listadoAsiento,
    };

    listadoAsiento.forEach((e) => dispatcher(cerrarAsiento(e)));
    dispatcher(agregarCompra(compraPayload));
    dispatcher(guardarCompra());
    dispatcher(limpiarSeleccion([]));
    dispatcher(
      seleccionar({
        MovieTheaterNumber: 0,
        lines: [],
        movieId: 0,
        hour: '',
      })
    );
  };

  return (
    <div className="flex h-full min-h-0 w-xs flex-col border-l border-slate-200 bg-gradient-to-b from-slate-50 to-slate-100 p-4 shadow-xl">
      <div className="mb-2 rounded-2xl border border-slate-200 bg-white/90 p-5 text-center shadow-sm backdrop-blur">
        <p className="text-xs font-semibold tracking-[0.2em] text-slate-500 uppercase">Carrito</p>
        <h2 className="mt-1 text-2xl font-black tracking-tight text-slate-800">Compra de boletos</h2>
      </div>
      <div className="flex-1 overflow-auto pr-1 pb-24">
        <div className="mb-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-xs font-semibold tracking-wide text-slate-500 uppercase">Total estimado</p>
          <p className="mt-1 text-3xl font-extrabold leading-none text-emerald-700">$ {total.toFixed(2)}</p>
          <p className="mt-2 text-sm text-slate-500">{listadoAsiento.length} asiento(s) × $3.50</p>
        </div>
        {boleteria.seats.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-6 text-center text-sm text-slate-500 shadow-sm">
            Selecciona asientos para comenzar.
          </div>
        ) : (
          boleteria.seats.map((e) => (
            <div
              className="mb-3 flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-3 shadow-sm transition-transform duration-200 hover:-translate-y-0.5"
              key={e.name}
            >
              <div
                className="flex h-14 w-14 items-center justify-center rounded-xl bg-slate-800 text-sm font-bold text-white"
                style={{ width: '56px' }}
              >
                <p>{e.name}</p>
              </div>
              <div className="ml-3 flex-1 text-sm">
                <p className="font-semibold text-slate-800">Asiento básico</p>
                <p className="line-clamp-1 text-slate-600">{peliculaSeleccionada?.title ?? 'Película'}</p>
                <p className="mt-1 text-xs font-medium text-slate-500">$3.55 x 1</p>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="sticky bottom-0 mt-4 flex flex-col gap-3 border-t border-slate-200 bg-gradient-to-b from-slate-100/40 to-slate-100 pt-4 pb-1">
        <button
          className="rounded-xl bg-emerald-600 p-3.5 text-sm font-semibold text-white shadow-md transition duration-200 hover:cursor-pointer hover:bg-emerald-700 hover:shadow-lg"
          onClick={realizarCompra}
        >
          Confirmar Compra
        </button>
        <button
          className="rounded-xl border border-red-200 bg-red-50 p-3.5 text-sm font-semibold text-red-700 transition duration-200 hover:cursor-pointer hover:bg-red-100"
          onClick={limpiar}
        >
          Limpiar Carrito
        </button>
      </div>
    </div>
  );
}