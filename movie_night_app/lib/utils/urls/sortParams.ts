import { SortOrder } from '@/lib/types/sort';

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
