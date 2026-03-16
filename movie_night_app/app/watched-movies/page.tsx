import { toWatchedMovies, toUser } from '@/lib/transform';
import type { User, WatchedMovie } from '@/lib/types/domain';
import WatchedMoviesLayout from '../components/watched-movies/WatchedMoviesLayout';
import { auth } from '@/app/auth';
import { mapSessionToLoggedInUser } from '@/lib/auth/session';
import { getWatchedMovies } from '@/lib/queries/watched-movies';
import { getUsers } from '@/lib/queries/users';

export const dynamic = 'force-dynamic';

export default async function WatchedMovies() {
  const session = await auth();
  const loggedInUser = mapSessionToLoggedInUser(session);

  const userRows = await getUsers();
  const watchedMovieRows = await getWatchedMovies();

  const rows = await watchedMovieRows;

  const movies: WatchedMovie[] = toWatchedMovies(rows);

  const users: User[] = userRows.map(toUser);

  return <WatchedMoviesLayout movies={movies} loggedInUser={loggedInUser} users={users} />;
}
