import { WatchedMovieSearchParams } from '@/lib/types/params';
import { Suspense } from 'react';
import WatchedMoviesDetail from './Content';

export default function WatchedMovies({
  searchParams,
}: {
  searchParams: WatchedMovieSearchParams;
}) {
  return (
    <Suspense fallback={<div>Loading movies...</div>}>
      <WatchedMoviesDetail searchParams={searchParams} />
    </Suspense>
  );
}
