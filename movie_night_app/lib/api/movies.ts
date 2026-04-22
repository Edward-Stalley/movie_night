import { SearchedMovie, StoredMovie } from '../types/domain';

export async function deleteMovieFromMovies(movie: StoredMovie) {
  await fetch(`/api/movies/movies/${movie.id}`, {
    method: 'DELETE',
    body: JSON.stringify(movie),
  });
}

export async function addSearchedMovieToMovies(movie: SearchedMovie) {
  await fetch('/api/movies/movies', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(movie),
  });
}
