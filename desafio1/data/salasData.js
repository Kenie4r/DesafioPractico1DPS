import { peliculas } from './data.js';

const seatPatterns = [
  ['n/a', 'activo', 'activo', 'activo', 'activo', 'inactivo', 'activo', 'preseleccionado', 'activo', 'activo', 'activo', 'activo', 'activo', 'n/a'],
  ['n/a', 'activo', 'inactivo', 'activo', 'preseleccionado', 'activo', 'activo', 'activo', 'activo', 'activo', 'activo', 'inactivo', 'activo', 'n/a'],
  ['n/a', 'activo', 'activo', 'inactivo', 'activo', 'activo', 'preseleccionado', 'activo', 'activo', 'activo', 'activo', 'activo', 'activo', 'n/a'],
];

const buildLine = (lineNumber, pattern, variant) => ({
  lineNumber,
  seats: pattern.map((status, index) => ({
    status,
    preferential: [2, 7, 11].includes(index) || (index + variant) % 4 === 0,
    name: `${lineNumber}${index + 1}`,
  })),
});

const buildSala = (movieId, theaterNumber, variant) => ({
  movieId,
  MovieTheaterNumber: theaterNumber,
  lines: ['A', 'B', 'C', 'D', 'E'].map((lineNumber, index) =>
    buildLine(lineNumber, seatPatterns[(variant + index) % seatPatterns.length], variant + index)
  ),
});

export const salasData = peliculas.flatMap((pelicula, movieIndex) =>
  [1, 2, 3].map((theaterOffset, index) => buildSala(pelicula.id, movieIndex * 10 + theaterOffset, movieIndex + index))
);
