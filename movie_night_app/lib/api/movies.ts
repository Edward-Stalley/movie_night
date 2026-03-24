// lib/api/movies.ts

import { StoredMovie } from '../types/domain';
import { MovieInsert } from '../types/db';

export async function deleteMovieFromMovies(movie: StoredMovie) {
  await fetch(`/api/movies/movies/${movie.id}`, {
    method: 'DELETE',
    body: JSON.stringify(movie),
  });
}

export async function addSearchedMovieToMovies(movie: MovieInsert) {
  console.log('movie', movie)
  await fetch('/api/movies/movies', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(movie),
  });
}
