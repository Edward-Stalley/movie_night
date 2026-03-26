import { searchMovie } from '@/lib/external/tmdb';
import { toSearchedMovie } from '@/lib/transform';
import { SearchedMovie } from '@/lib/types/domain';

import { auth } from '@/app/auth';
import { mapSessionToLoggedInUser } from '@/lib/auth/session';
import SearchedMoviesLayout from '../components/searchedMovies/SearchedMoviesLayout';
import { SearchedMovieSortValue, SortOrder } from '@/lib/types/pagination';
import { sortSearchedMovies } from '@/lib/utils/sort/sortSearchedMovies';

type SearchParams = {
  query?: string;
  page?: string;
  sort?: SearchedMovieSortValue;
  order?: SortOrder;
};

export default async function SearchMovie({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;

  const query = params.query ?? '';
  const page = Math.max(1, Number(params.page) || 1);

  const sort: SearchedMovieSortValue = params.sort ?? 'title';
  const order: SortOrder = params.order ?? 'desc';

  // AUTH
  const session = await auth();
  const loggedInUser = mapSessionToLoggedInUser(session);

  // ❗ If no query → don't fetch
  if (!query) {
    return (
      <SearchedMoviesLayout
        movies={[]}
        loggedInUser={loggedInUser}
        pagination={{ page: 1, totalPages: 1 }}
        sortValue={sort}
        sortOrder={order}
        emptyState
      />
    );
  }

  // SEARCH API
  const data = await searchMovie(query, page);
  const totalPages = data.total_pages;

  const searchedMovies: SearchedMovie[] = data.results.map(toSearchedMovie);
  // TMDB Results (20 at a time) so need client side sorting ↓
  const movies = sortSearchedMovies(searchedMovies, sort, order);

  return (
    <SearchedMoviesLayout
      movies={movies}
      loggedInUser={loggedInUser}
      pagination={{ page, totalPages }}
      sortValue={sort}
      sortOrder={order}
    />
  );
}
