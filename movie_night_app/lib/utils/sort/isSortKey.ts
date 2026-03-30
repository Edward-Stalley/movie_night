import { MOVIE_SORT_MAP } from '@/lib/config/sorts';
import { SortKey } from '@/lib/types/sort';

export function isSortKey(value: string): value is SortKey {
  return value in MOVIE_SORT_MAP;
}
