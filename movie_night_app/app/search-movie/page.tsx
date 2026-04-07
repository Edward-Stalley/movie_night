import { searchMovie } from '@/lib/external/tmdb';
import { toSearchedMovie, toTMDBMovie } from '@/lib/transform';
import { SearchedMovie } from '@/lib/types/domain';

import { auth } from '@/auth';
import { mapSessionToLoggedInUser } from '@/lib/auth/session';
import SearchedMoviesLayout from '../components/searchedMovies/SearchedMoviesLayout';
import { SearchedMovieSortValue, SortOrder } from '@/lib/types/sort';
import { sortSearchedMovies } from '@/lib/utils/sort/sortSearchedMovies';
import { Suspense } from 'react';

type SearchParams = {
  query?: string;
  page?: string;
  sort?: SearchedMovieSortValue;
  order?: SortOrder;
};

async function MoviesContent({ searchParams }: { searchParams: SearchParams }) {
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
  // TRANSFORM
  const tmdbMovies = data.results.map(toTMDBMovie);
  const searchedMovies: SearchedMovie[] = tmdbMovies.map(toSearchedMovie);
  const movies = sortSearchedMovies(searchedMovies, sort, order);

  // TMDB Results (20 at a time) so need client side sorting ↓
  const totalPages = data.total_pages;

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

export default async function SearchMovie({ searchParams }: { searchParams: SearchParams }) {
  return (
    <Suspense fallback={<div>Loading movies...</div>}>
      <MoviesContent searchParams={searchParams} />
    </Suspense>
  );
}
