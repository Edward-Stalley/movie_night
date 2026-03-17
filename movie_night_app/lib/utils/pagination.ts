export function buildPagination(pageSize: number, pageParam?: string) {
  const page = Math.max(1, Number(pageParam) || 1);
  const offset = (page - 1) * pageSize;

  return {
    page,
    pageSize,
    offset,
  };
}
