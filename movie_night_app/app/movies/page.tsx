import { toStoredMovies } from '@/lib/transform';
import { StoredMovie } from '@/lib/types/domain';
import { getMovies } from '@/lib/queries/movies';
import MoviesLayout from '../components/movies/MoviesLayout';
import { mapSessionToLoggedInUser } from '@/lib/auth/session';
import { auth } from '@/app/auth';
import { buildPagination } from '@/lib/utils/pagination';
import { PAGE_SIZES } from '@/lib/config/pagination';
export const dynamic = 'force-dynamic';

export default async function Movies({ searchParams }: { searchParams: { page?: string } }) {
  const params = await searchParams;
  // PAGINATION
  const { page, pageSize, offset } = buildPagination(PAGE_SIZES.movies, params.page);

  // QUERY
  const { data: movieRows, total } = await getMovies(pageSize, offset);
  const movies: StoredMovie[] = movieRows.map(toStoredMovies);

  // PAGINATION META
  const totalPages = Math.ceil(total / pageSize);

  // AUTH
  const session = await auth();
  const loggedInUser = mapSessionToLoggedInUser(session);

  return (
    <MoviesLayout movies={movies} loggedInUser={loggedInUser} pagination={{ page, totalPages }} />
  );
}
