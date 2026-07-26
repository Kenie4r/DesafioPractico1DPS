import type { Movie } from '@/types/pelicula';

interface MovieProps {
  pelicula: Movie;
  showDetails: () => void;
}

export default function MovieCard({ pelicula, showDetails }: MovieProps) {
  return (
    <button
      type="button"
      onClick={showDetails}
      className="group relative h-80 w-full overflow-hidden rounded-xl shadow-lg"
    >
      <img src={pelicula.image} alt={pelicula.title} className="h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-4 text-left text-white">
        <p className="text-lg font-semibold">{pelicula.title}</p>
        <p className="text-sm text-slate-200">{pelicula.genre}</p>
      </div>
    </button>
  );
}