import { Suspense } from 'react';
import MovieDetailContent from './MovieDetailContent';

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  return (
    <Suspense>
      <MovieDetailContent params={params} />
    </Suspense>
  );
}
