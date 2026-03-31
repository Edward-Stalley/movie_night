import { toStoredMovies } from '@/lib/transform';
import { StoredMovie } from '@/lib/types/domain';
import { getMovies } from '@/lib/queries/movies';
import MoviesLayout from '../components/movies/MoviesLayout';
import { mapSessionToLoggedInUser } from '@/lib/auth/session';
import { auth } from '@/app/auth';
import { PAGE_SIZES } from '@/lib/config/pagination';
import { MovieSortValue, SortOrder } from '@/lib/types/sort';
import { buildQuery } from '@/lib/utils/query';
export const dynamic = 'force-dynamic';

type SearchParams = {
  page?: string;
  sort?: MovieSortValue;
  order?: SortOrder;
};

export default async function Movies({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const sort: MovieSortValue = params.sort ?? 'addedOn';
  const order: SortOrder = params.order === 'asc' ? 'asc' : 'desc';

  // AUTH
  const session = await auth();
  const loggedInUser = mapSessionToLoggedInUser(session);

  // QUERY
  const query = buildQuery(params, PAGE_SIZES.movies, 'addedOn');
  const { data: movieRows, total } = await getMovies(query);
  const movies: StoredMovie[] = movieRows.map(toStoredMovies);
  console.log('movies', movies, 'movieRows', movieRows);
  // PAGINATION META
  const totalPages = Math.ceil(total / query.limit);

  return (
    <MoviesLayout
      movies={movies}
      loggedInUser={loggedInUser}
      pagination={{ page: query.page, totalPages }}
      sortValue={sort}
      sortOrder={order}
    />
  );
}
