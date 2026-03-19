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
import { WatchedMovieSortValue, SortOrder } from '@/lib/types/pagination';

export const dynamic = 'force-dynamic';

type SearchParams = {
  page?: string;
  sort?: WatchedMovieSortValue;
  order?: SortOrder;
};

export default async function WatchedMovies({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const sort: WatchedMovieSortValue = params.sort ?? 'watchedOn';
  const order: SortOrder = params.order ?? 'desc';

  // PAGINATION
  const { page, pageSize, offset } = buildPagination(PAGE_SIZES.watchedMovies, params.page);

  // QUERY
  const query = buildQuery(params, PAGE_SIZES.watchedMovies, 'watchedOn');
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
      pagination={{ page, totalPages, sort, order }}
      sortValue={sort}
      sortOrder={order}
    />
  );
}
