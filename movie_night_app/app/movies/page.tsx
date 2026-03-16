import { toStoredMovies } from '@/lib/transform';
import { StoredMovie } from '@/lib/types/domain';
import { getMovies } from '@/lib/queries/movies';
import MoviesLayout from '../components/movies/MoviesLayout';
import { mapSessionToLoggedInUser } from '@/lib/auth/session';
import { auth } from '@/app/auth';
export const dynamic = 'force-dynamic';

export default async function GeneralMovieList() {
  const data = await getMovies();
  const movies: StoredMovie[] = data.map(toStoredMovies);
  const session = await auth();
  const loggedInUser = mapSessionToLoggedInUser(session);

  return <MoviesLayout movies={movies} loggedInUser={loggedInUser} />;
}
