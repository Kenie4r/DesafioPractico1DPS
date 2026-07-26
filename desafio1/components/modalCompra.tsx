import { useAppSelector } from '@/redux/hooks';
import type { ticketsBuy } from '@/types/reserva';

interface ModalCompraProps {
  compra: ticketsBuy | null;
  cerrarSeleccion: () => void;
}

export default function ModalCompra({ compra, cerrarSeleccion }: ModalCompraProps) {
  const peliculas = useAppSelector((state) => state.movie);

  if (!compra) {
    return null;
  }

  const pelicula = peliculas.find((item) => item.id === compra.movieId);
  const asientosComprados = [...compra.seats].sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }));
  const compraConTotal = compra as ticketsBuy & { total?: number };
  const totalCompra = compraConTotal.total ?? compra.price ?? asientosComprados.length * 3.5;

  return (
    <div className="fixed top-0 right-0 z-[1000001] flex h-full w-full items-center justify-center bg-gray-800/50 px-4">
      <div className="relative w-full max-w-2xl rounded-lg bg-white shadow-xl">
        <div className="border-b border-slate-200 p-6">
          <h2 className="text-2xl font-semibold text-slate-800">{pelicula?.title ?? 'Pelicula'}</h2>
          <p className="text-sm text-slate-500">Detalle de la compra</p>
        </div>

        <div className="space-y-5 p-6">
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-lg bg-slate-100 p-3">
              <p className="text-xs uppercase text-slate-500">Sala</p>
              <p className="text-lg font-semibold text-slate-800">{compra.theatherId}</p>
            </div>
            <div className="rounded-lg bg-slate-100 p-3">
              <p className="text-xs uppercase text-slate-500">Boletos</p>
              <p className="text-lg font-semibold text-slate-800">{asientosComprados.length}</p>
            </div>
            <div className="rounded-lg bg-slate-100 p-3">
              <p className="text-xs uppercase text-slate-500">Total</p>
              <p className="text-lg font-semibold text-emerald-700">$ {totalCompra.toFixed(2)}</p>
            </div>
          </div>

          <div>
            <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-600">Asientos comprados</h3>
            {asientosComprados.length === 0 ? (
              <p className="rounded-lg border border-dashed border-slate-300 p-3 text-sm text-slate-500">No hay asientos registrados para esta compra.</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {asientosComprados.map((asiento) => (
                  <span key={asiento.name} className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
                    {asiento.name}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        <button
          type="button"
          className="absolute top-3 right-3 rounded-md border border-slate-200 px-3 py-1 text-sm font-medium text-slate-600 hover:bg-slate-100"
          onClick={cerrarSeleccion}
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}
