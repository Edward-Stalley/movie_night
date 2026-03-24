import { QueryParams } from '../types/db';
import { SortOrder } from '../types/pagination';

export function buildQuery(params: QueryParams, defaultLimit: number, defaultSort: string) {
  // Pagination
  const page = Math.max(1, Number(params.page) || 1);
  const limit = defaultLimit;
  const offset = (page - 1) * limit;

  // Sorting (safe defaults)
  const sortBy = params.sort ?? defaultSort;
  const order: SortOrder = params.order === 'asc' ? 'asc' : 'desc';
  return {
    page,
    limit,
    offset,
    sortBy,
    order,
  };
}
