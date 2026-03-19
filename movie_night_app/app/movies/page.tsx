import { toStoredMovies } from '@/lib/transform';
import { StoredMovie } from '@/lib/types/domain';
import { getMovies } from '@/lib/queries/movies';
import MoviesLayout from '../components/movies/MoviesLayout';
import { mapSessionToLoggedInUser } from '@/lib/auth/session';
import { auth } from '@/app/auth';
import { buildPagination } from '@/lib/utils/pagination';
import { PAGE_SIZES } from '@/lib/config/pagination';
import { MovieSortValue, SortOrder } from '@/lib/types/pagination';
import { buildQuery } from '@/lib/utils/query';
export const dynamic = 'force-dynamic';

type SearchParams = {
  page?: string;
  sort?: MovieSortValue;
  order?: SortOrder;
};

export default async function Movies({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const sort: MovieSortValue = params.sort ?? 'title';
  const order: SortOrder = params.order ?? 'desc';
  // PAGINATION
  const { page, pageSize, offset } = buildPagination(PAGE_SIZES.movies, params.page);

  // QUERY
  const query = buildQuery(params, PAGE_SIZES.movies, 'title');
  const { data: movieRows, total } = await getMovies(pageSize, offset);
  const movies: StoredMovie[] = movieRows.map(toStoredMovies);

  // PAGINATION META
  const totalPages = Math.ceil(total / pageSize);

  // AUTH
  const session = await auth();
  const loggedInUser = mapSessionToLoggedInUser(session);

  return (
    <MoviesLayout
      movies={movies}
      loggedInUser={loggedInUser}
      pagination={{ page, totalPages, sort, order }}
      sortValue={sort}
      sortOrder={order}
    />
  );
}
