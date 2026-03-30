// Movies From TMDB API need custom sort unlike data from my DB.

import { MOVIE_SORT_MAP } from '@/lib/config/sorts';
import { SearchedMovie } from '@/lib/types/domain';
import { SearchedMovieSortValue, SortKey, SortOrder } from '@/lib/types/sort';

export function sortSearchedMovies(
  movies: SearchedMovie[],
  sort: SearchedMovieSortValue,
  order: SortOrder,
) {
  return [...movies].sort((a, b) => {
    if (sort === 'releaseDate') {
      const dateA = new Date(a.releaseDate || '').getTime();
      const dateB = new Date(b.releaseDate || '').getTime();
      return order === 'asc' ? dateA - dateB : dateB - dateA;
    }

    if (sort === 'title' && a.title && b.title) {
      return order === 'asc' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title);
    }

    return 0;
  });
}
