import { WatchedMovieSearchParams } from '@/lib/types/params';
import { Suspense } from 'react';
import WatchedMoviesContent from './Content';
import Loading from '../components/layout/Loading';

export default function WatchedMovies({
  searchParams,
}: {
  searchParams: WatchedMovieSearchParams;
}) {
  return (
    <Suspense fallback={<Loading />}>
      <WatchedMoviesContent searchParams={searchParams} />
    </Suspense>
  );
}
