export function buildPagination(pageSize: number, pageParam?: string) {
  const page = Math.max(1, Number(pageParam) || 1);
  const offset = (page - 1) * pageSize;

  return {
    page,
    pageSize,
    offset,
  };
}

export function buildPageHref(currentParams: URLSearchParams, updates: Record<string, string>) {
  const params = new URLSearchParams(currentParams.toString());

  Object.entries(updates).forEach(([key, value]) => {
    params.set(key, value);
  });

  return `?${params.toString()}`;
}
