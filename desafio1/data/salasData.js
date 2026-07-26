import { peliculas } from './data.js';

const seatPatterns = [
  ['n/a', 'activo', 'activo', 'activo', 'activo', 'inactivo', 'n/a', 'n/a', 'activo', 'activo', 'activo', 'activo', 'activo', 'n/a'],
  ['n/a', 'activo', 'inactivo', 'activo', 'preseleccionado', 'activo', 'activo', 'activo', 'activo', 'activo', 'activo', 'inactivo', 'activo', 'n/a'],
  ['n/a', 'activo', 'activo', 'inactivo', 'activo', 'activo', 'preseleccionado', 'activo', 'activo', 'activo', 'activo', 'activo', 'activo', 'n/a'],
];

export const defaultHours = ['14:00', '16:30', '19:00', '21:30'];

const buildLine = (lineNumber, pattern, variant) => ({
  lineNumber,
  seats: pattern.map((status, index) => ({
    status,
    preferential: [2, 7, 11].includes(index) || (index + variant) % 4 === 0,
    name: `${lineNumber}${index + 1}`,
  })),
});

const buildSala = (movieId, theaterNumber, variant, hour) => ({
  movieId,
  MovieTheaterNumber: theaterNumber,
  hour,
  lines: ['A', 'B', 'C', 'D', 'E'].map((lineNumber, index) =>
    buildLine(lineNumber, seatPatterns[(variant + index) % seatPatterns.length], variant + index)
  ),
});

export const buildSalasForMovie = (movieId, theaterNumberBase = 1, hours = defaultHours) =>
  hours.map((hour, index) => buildSala(movieId, theaterNumberBase + index, index, hour));

export const salasData = peliculas.flatMap((pelicula, movieIndex) =>
  buildSalasForMovie(pelicula.id, movieIndex * 10 + 1)
);
