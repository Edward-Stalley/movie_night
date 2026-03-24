export function buildPageHref(currentParams: URLSearchParams, updates: Record<string, string>) {
  const params = new URLSearchParams(currentParams.toString());

  Object.entries(updates).forEach(([key, value]) => {
    params.set(key, value);
  });

  return `?${params.toString()}`;
}
