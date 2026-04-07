import { Suspense } from 'react';
import SearchMovieDetailContent from './Content';

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  return (
    <Suspense>
      <SearchMovieDetailContent params={params} />
    </Suspense>
  );
}
