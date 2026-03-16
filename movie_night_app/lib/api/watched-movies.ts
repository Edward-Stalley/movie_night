import { WatchedMovieInsert } from '@/lib/types/db';
import { User, WatchedMovie } from '../types/domain';

export async function addMovieToWatched(movie: WatchedMovieInsert) {
  await fetch(`/api/movies/watched`, {
    method: 'POST',
    body: JSON.stringify(movie),
  });
}

export async function updateChosenBy(movieId: number, user: User) {
  await fetch(`/api/movies/watched/${movieId}`, {
    method: 'PATCH',
    body: JSON.stringify({ chosenBy: user.id }),
  });
}

export async function updateWatchedOn(movieId: number, watchedOn: string) {
  await fetch(`/api/movies/watched/${movieId}`, {
    method: 'PATCH',
    body: JSON.stringify({ watchedOn: watchedOn }),
  });
}

export async function deleteMovieFromWatched(movie: WatchedMovie) {
  await fetch(`/api/movies/watched/${movie.id}`, {
    method: 'DELETE',
    body: JSON.stringify(movie),
  });
}
