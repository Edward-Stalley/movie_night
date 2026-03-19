export interface PaginatedResult<T> {
  data: T[];
  total: number;
}

export type WatchedMovieSortValue = 'watchedOn' | 'title' | 'chosenBy';
export type MovieSortValue = 'title'; // extend later
export type SortOrder = 'asc' | 'desc';

export type SortOption = {
  value: string;
  label: string;
};
