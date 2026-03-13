import { WatchedMovieInsert } from '@/lib/types/db';
import { User } from '../types/domain';

export async function addMovieToWatched(movie: WatchedMovieInsert) {
  await fetch(`/api/movies/watched`, {
    method: 'POST',
    body: JSON.stringify(movie),
  });
}

export async function updateChosenBy(movieId: number, user: User) {
  await fetch(`/api/movies/watched/${movieId}`, {
    method: 'PATCH',
    body: JSON.stringify({ userId: user.id }),
  });
}