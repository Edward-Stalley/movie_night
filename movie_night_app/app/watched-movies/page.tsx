import { groupWatchedMovies } from '@/lib/transform';
import type { WatchedMovie } from '@/lib/types/domain';
import WatchedMoviesLayout from '../components/watched-movies/WatchedMoviesLayout';
import { auth } from '@/app/auth';
import { mapSessionToLoggedInUser } from '@/lib/auth/session';
import { getWatchedMoviesRaw } from '@/lib/queries/watched-movies';

export const dynamic = 'force-dynamic';

export default async function WatchedMovies() {
  const session = await auth();
  const loggedInUser = mapSessionToLoggedInUser(session);

  const data = await getWatchedMoviesRaw();
  const rows = await data;

  const movies: WatchedMovie[] = groupWatchedMovies(rows);

  return <WatchedMoviesLayout movies={movies} loggedInUser={loggedInUser} />;
}
