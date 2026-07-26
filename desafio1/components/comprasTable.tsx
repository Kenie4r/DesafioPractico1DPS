import { useAppSelector } from '@/redux/hooks';

interface ComprasTableProps {
  onSelectCompra: (compra: any) => void;
}

export default function ComprasTable({ onSelectCompra }: ComprasTableProps) {
  const peliculas = useAppSelector((state) => state.movie);
  const ventas = useAppSelector((state) => state.compras);

  return (
    <div className="flex flex-col gap-4 bg-white p-8">
      <div className="text-lg font-bold">
        <h2>Listado de compras realizadas</h2>
      </div>
      <div className="h-2xl rounded-lg p-2 shadow-lg">
        <table className="table table-auto min-w-full leading-normal">
          <thead className="bg-gray-400 text-white">
            <tr>
              <th className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700">#Orden</th>
              <th className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700">Pelicula</th>
              <th className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700"># asientos</th>
              <th className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700">Sala</th>
              <th className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700">Hora</th>
              <th className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700">Detalle</th>
            </tr>
          </thead>
          <tbody>
            {ventas.map((e, index) => {
              const pelicula = peliculas.find((p) => p.id === e.movieId);
              return (
                <tr key={`${e.movieId}-${index}`} className="hover:bg-gray-200">
                  <td className="border-b border-gray-200 bg-white px-5 py-5 text-center text-sm">
                    <p className="whitespace-no-wrap text-gray-900">Orden #</p>
                    <p className="whitespace-no-wrap text-gray-600">{index + 1}</p>
                  
                  </td>
                  <td className="border-b border-gray-200 bg-white px-5 py-5 text-center text-sm">
                    <p className="whitespace-no-wrap text-gray-900">{pelicula?.title ?? 'Película'}</p>
                  </td>
                  <td className="border-b border-gray-200 bg-white px-5 py-5 text-center text-sm">
                    <p className="whitespace-no-wrap text-gray-900">Cantidad de asientos:</p>
                    <p className="whitespace-no-wrap text-gray-600">{e.seats.length} asientos</p>
                  </td>
                  <td className="border-b border-gray-200 bg-white px-5 py-5 text-center text-sm">
                    <p className="whitespace-no-wrap text-gray-900">Sala</p>
                    <p className="whitespace-no-wrap text-gray-600">{e.theatherId}</p>
                  </td>
                  <td className="border-b border-gray-200 bg-white px-5 py-5 text-center text-sm">
                    <p className="whitespace-no-wrap text-gray-900">Hora</p>
                    <p className="whitespace-no-wrap text-gray-600">{e.hour ?? '--:--'}</p>
                  </td>
                  <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                    <div className="flex flex-wrap gap-2">
                      
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-500">Detalle Asientos</span>
                        <button
                          onClick={() => onSelectCompra(e)}
                          className="mt-2 rounded bg-blue-500 px-3 py-1 text-sm text-white"
                        >
                          Ver Detalle
                        </button>                     
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}