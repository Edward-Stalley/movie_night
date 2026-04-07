import { toStoredMovies } from '@/lib/transform';
import { StoredMovie } from '@/lib/types/domain';
import { getMovies } from '@/lib/queries/movies';
import MoviesLayout from '../components/movies/MoviesLayout';
import { mapSessionToLoggedInUser } from '@/lib/auth/session';
import { auth } from '@/auth';
import { PAGE_SIZES } from '@/lib/config/pagination';
import { MovieSortValue, SortOrder } from '@/lib/types/sort';
import { buildQuery } from '@/lib/utils/query';
import { MovieSearchParams } from '@/lib/types/params';

// PreFetch Pages
export async function generateStaticParams() {
  const { total } = await getMovies({
    limit: 1,
    offset: 0,
    sortBy: 'title',
    order: 'asc',
  });

  const pages = Math.ceil(total / 20);

  return Array.from({ length: Math.min(pages, 4) }, (_, i) => ({
    page: String(i + 1),
  }));
}

export default async function MoviesContent({ searchParams }: { searchParams: MovieSearchParams }) {
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
