'use client';

import { useAppSelector } from '@/redux/hooks';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const TICKET_PRICE = 3.5;

export default function Dashboard() {
  const peliculas = useAppSelector((state) => state.movie);
  const funciones = useAppSelector((state) => state.movieTheather);
  const compras = useAppSelector((state) => state.compras);

  const totalPeliculas = peliculas.length;
  const totalFunciones = funciones.length;
  const ventasTotales = compras.reduce((acc, compra) => acc + compra.seats.length, 0);
  const totalEnVentas = compras.reduce((acc, compra) => acc + (compra.price ?? compra.seats.length * TICKET_PRICE), 0);
  const asientosDisponibles = funciones.reduce(
    (totalSala, sala) =>
      totalSala +
      sala.lines.reduce(
        (totalLinea, linea) => totalLinea + linea.seats.filter((asiento) => asiento.status === 'activo').length,
        0
      ),
    0
  );
  const ventasPorPelicula = peliculas
    .map((pelicula) => {
      const ventas = compras
        .filter((compra) => compra.movieId === pelicula.id)
        .reduce((acumulado, compra) => acumulado + compra.seats.length, 0);

      return {
        name: pelicula.title,
        ventas,
      };
    })
    .sort((a, b) => b.ventas - a.ventas);

  return (
    <div className="space-y-6 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <div>
        <h2 className="text-2xl font-semibold text-slate-800">Dashboard general</h2>
        <p className="text-sm text-slate-500">Resumen rápido de películas, funciones, boletos y asientos.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <div className="rounded-xl bg-blue-50 p-4">
          <p className="text-sm text-blue-700">Total de pel\u00edculas</p>
          <p className="text-3xl font-semibold text-blue-900">{totalPeliculas}</p>
        </div>
        <div className="rounded-xl bg-green-50 p-4">
          <p className="text-sm text-green-700">Total de funciones</p>
          <p className="text-3xl font-semibold text-green-900">{totalFunciones}</p>
        </div>
        <div className="rounded-xl bg-amber-50 p-4">
          <p className="text-sm text-amber-700">Total de boletos vendidos</p>
          <p className="text-3xl font-semibold text-amber-900">{ventasTotales}</p>
        </div>
        <div className="rounded-xl bg-slate-100 p-4">
          <p className="text-sm text-slate-700">Total de asientos disponibles</p>
          <p className="text-3xl font-semibold text-slate-900">{asientosDisponibles}</p>
        </div>
        <div className="rounded-xl bg-emerald-50 p-4">
          <p className="text-sm text-emerald-700">Total en ventas</p>
          <p className="text-3xl font-semibold text-emerald-900">$ {totalEnVentas.toFixed(2)}</p>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 p-4">
        <h3 className="mb-4 text-lg font-semibold text-slate-800">Ventas por pelicula</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={ventasPorPelicula} margin={{ top: 8, right: 8, left: 0, bottom: 8 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" interval={0} angle={-15} textAnchor="end" height={70} />
              <YAxis allowDecimals={false} />
              <Tooltip formatter={(value: number) => [value, 'Boletos']} />
              <Bar dataKey="ventas" fill="#2563eb" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
