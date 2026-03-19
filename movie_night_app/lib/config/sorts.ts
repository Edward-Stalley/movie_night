import { SortOrder } from '../types/pagination';

export const SORT_OPTIONS_WATCHED_MOVIES = [
  { value: 'watchedOn', label: 'Watched Date' },
  { value: 'title', label: 'Title' },
  { value: 'chosenBy', label: 'Chosen By' },
  // review → Future Implementaion
];

export const SORT_OPTIONS_MOVIES = [
  { value: 'title', label: 'Title' },
  // addedBy → addedBy ,
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
