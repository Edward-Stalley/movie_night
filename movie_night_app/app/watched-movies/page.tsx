import { toWatchedMovies, toUser } from '@/lib/transform';
import type { User, WatchedMovie } from '@/lib/types/domain';
import WatchedMoviesLayout from '../components/watched-movies/WatchedMoviesLayout';
import { auth } from '@/app/auth';
import { mapSessionToLoggedInUser } from '@/lib/auth/session';
import { getWatchedMovies } from '@/lib/queries/watched-movies';
import { getUsers } from '@/lib/queries/users';
import { buildPagination } from '@/lib/utils/pagination';
import { PAGE_SIZES } from '@/lib/config/pagination';
import { buildQuery } from '@/lib/utils/query';

export const dynamic = 'force-dynamic';

export default async function WatchedMovies({ searchParams }: { searchParams: { page?: string } }) {
  const params = await searchParams;
  // PAGINATION
  const { page, pageSize, offset } = buildPagination(PAGE_SIZES.watchedMovies, params.page);

  // QUERY
  const query = buildQuery(params, PAGE_SIZES.movies, 'watchedOn');
  const { data: watchedMovieRows, total } = await getWatchedMovies(query);
  const movies: WatchedMovie[] = toWatchedMovies(watchedMovieRows);

  // TRANSFORM
  const userRows = await getUsers();
  const users: User[] = userRows.map(toUser);

  // PAGINATION META
  const totalPages = Math.ceil(total / pageSize);

  // AUTH
  const session = await auth();
  const loggedInUser = mapSessionToLoggedInUser(session);

  return (
    <WatchedMoviesLayout
      movies={movies}
      loggedInUser={loggedInUser}
      users={users}
      pagination={{ page, totalPages }}
    />
  );
}
