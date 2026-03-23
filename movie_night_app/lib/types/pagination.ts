export interface PaginatedResult<T> {
  data: T[];
  total: number;
}

export type SearchedMovieSortValue = 'title' | 'releaseDate';
export type MovieSortValue = 'title' | 'addedBy' | 'addedOn';
export type WatchedMovieSortValue = 'title' | 'watchedOn' | 'chosenBy';

export type SortOrder = 'asc' | 'desc';

export type SortOption = {
  value: string;
  label: string;
};
