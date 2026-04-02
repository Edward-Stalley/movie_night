import { mapSessionToLoggedInUser } from '@/lib/auth/session';
import { auth } from '@/auth';
import CreateVoteSessionLayout from '@/app/components/vote-session/create/CreateVoteSessionLayout';
import { StoredMovie } from '@/lib/types/domain';
import { buildQuery } from '@/lib/utils/query';
import { getSelectedMoviesByIds } from '@/lib/queries/movies';
import { PAGE_SIZES } from '@/lib/config/pagination';
import { toStoredMovies } from '@/lib/transform';
import { MovieSortValue, SortOrder } from '@/lib/types/sort';
import { getUnwatchedMovies } from '@/lib/queries/vote';

type SearchParams = {
  page?: string;
  sort?: MovieSortValue;
  order?: SortOrder;
  selected?: string;
};

export default async function Voting({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const sort: MovieSortValue = params.sort ?? 'addedOn';
  const order: SortOrder = params.order === 'asc' ? 'asc' : 'desc';
  const selectedIds = params.selected ? params.selected.split(',').map(Number) : [];

  // AUTH
  const session = await auth();
  const loggedInUser = mapSessionToLoggedInUser(session);

  // QUERY
  const query = buildQuery(params, PAGE_SIZES.movies, 'addedOn');

  // DATA

  // --MOVIES
  const { data: movieRows, total } = await getUnwatchedMovies(query);
  const unWatchedMovies: StoredMovie[] = movieRows.map(toStoredMovies);

  // --VOTING SELECTIONS
  const selectedMovieData = await getSelectedMoviesByIds(selectedIds);
  const selectedMovies: StoredMovie[] = selectedMovieData.map(toStoredMovies);

  // PAGINATION META
  const totalPages = Math.ceil(total / query.limit);
  return (
    <CreateVoteSessionLayout
      loggedInUser={loggedInUser}
      movies={unWatchedMovies}
      pagination={{ page: query.page, totalPages }}
      sortValue={sort}
      sortOrder={order}
      selectedMovies={selectedMovies}
    />
  );
}
