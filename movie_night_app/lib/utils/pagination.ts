export function buildPagination(pageSize: number, pageParam?: string) {
  const page = Math.max(1, Number(pageParam) || 1);
  const offset = (page - 1) * pageSize;

  return {
    page,
    pageSize,
    offset,
  };
}

export function buildPageHref(page: number, sort: string, order: string) {
  const params = new URLSearchParams();
  params.set('page', String(page));
  params.set('sort', sort);
  params.set('order', order);
  return `?${params.toString()}`;
}
