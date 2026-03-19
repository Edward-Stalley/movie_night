import { SORT_OPTIONS_WATCHED_MOVIES } from '../config/sorts';

export interface PaginatedResult<T> {
  data: T[];
  total: number;
}

export type SortOption = (typeof SORT_OPTIONS_WATCHED_MOVIES)[number];
export type SortValue = SortOption['value'];
export type SortOrder = 'asc' | 'desc';
