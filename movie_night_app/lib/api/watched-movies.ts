import { User } from '../types/domain';

export async function updateChosenBy(movieId: number, user: User) {
  await fetch(`/api/movies/watched/${movieId}`, {
    method: 'PATCH',
    body: JSON.stringify({ chosenById: user.id }),
  });
}

export async function updateWatchedOn(movieId: number, watchedOn: string) {
  await fetch(`/api/movies/watched/${movieId}`, {
    method: 'PATCH',
    body: JSON.stringify({ watchedOn: watchedOn }),
  });
}
