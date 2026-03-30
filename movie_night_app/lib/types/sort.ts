import { MOVIE_SORT_MAP } from '@/lib/config/sorts';

export type SearchedMovieSortValue = 'title' | 'releaseDate';
export type MovieSortValue = 'title' | 'addedBy' | 'addedOn';
export type WatchedMovieSortValue = 'title' | 'watchedOn' | 'chosenBy';

export type SortOrder = 'asc' | 'desc';

export type SortOption = {
  value: string;
  label: string;
};

export type SortKey = keyof typeof MOVIE_SORT_MAP;
