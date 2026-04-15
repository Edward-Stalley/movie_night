import { toWatchedMovies, toUser } from '@/lib/transform';
import type { User, WatchedMovie } from '@/lib/types/domain';
import WatchedMoviesLayout from '../components/watchedMovies/WatchedMoviesLayout';
import { auth } from '@/auth';
import { mapSessionToLoggedInUser } from '@/lib/auth/session';
import { getWatchedMovies } from '@/lib/queries/watched-movies';
import { getUsers } from '@/lib/queries/users';
import { PAGE_SIZES } from '@/lib/config/pagination';
import { buildQuery } from '@/lib/utils/query';
import { WatchedMovieSortValue, SortOrder } from '@/lib/types/sort';
import { WatchedMovieSearchParams } from '@/lib/types/params';
import { unstable_noStore as noStore } from 'next/cache';

export default async function WatchedMoviesContent({
  searchParams,
}: {
  searchParams: WatchedMovieSearchParams;
}) {
  noStore();
  const params = await searchParams;
  const sort: WatchedMovieSortValue = params.sort ?? 'watchedOn';
  const order: SortOrder = params.order ?? 'desc';

  // QUERY
  const query = buildQuery(params, PAGE_SIZES.watchedMovies, 'watchedOn');

  // TRANSFORM

  const { data: watchedMovieRows, total } = await getWatchedMovies(query);
  const movies: WatchedMovie[] = toWatchedMovies(watchedMovieRows);

  const userRows = await getUsers();
  const users: User[] = userRows.map(toUser);

  // PAGINATION META
  const totalPages = Math.ceil(total / query.limit);

  // AUTH
  const session = await auth();
  const loggedInUser = mapSessionToLoggedInUser(session);

  return (
    <WatchedMoviesLayout
      movies={movies}
      loggedInUser={loggedInUser}
      users={users}
      pagination={{ page: query.page, totalPages }}
      sortValue={sort}
      sortOrder={order}
    />
  );
}
