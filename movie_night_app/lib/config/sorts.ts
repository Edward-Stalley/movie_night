import { SearchedMovie } from '../types/domain';
import { SearchedMovieSortValue, SortOrder } from '../types/pagination';

export const SORT_OPTIONS_WATCHED_MOVIES = [
  { value: 'title', label: 'Title' },
  { value: 'watchedOn', label: 'Watched Date' },
  { value: 'chosenBy', label: 'Chosen By' },
];

export const SORT_OPTIONS_MOVIES = [
  { value: 'title', label: 'Title' },
  { value: 'addedBy', label: 'Added By' },
  { value: 'addedOn', label: 'Added On' },
];

export const SORT_OPTIONS_SEARCHED_MOVIES = [
  { value: 'title', label: 'Title' },
  { value: 'releaseDate', label: 'Release Date' },
];

export function buildSortParams(
  currentParams: URLSearchParams,
  value: string,
  order: SortOrder,
  nextSort: string,
) {
  const params = new URLSearchParams(currentParams.toString());

  const newOrder = nextSort === value ? (order === 'asc' ? 'desc' : 'asc') : 'desc';

  params.set('sort', nextSort);
  params.set('order', newOrder);
  params.set('page', '1');

  return params.toString();
}

// Movies From TMDB API need custom sort unlike data from my DB.

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
