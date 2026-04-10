import { WatchedMovieSearchParams } from '@/lib/types/params';
import { Suspense } from 'react';
import WatchedMoviesDetail from './Content';
import Loading from '../components/layout/Loading';

export default function WatchedMovies({
  searchParams,
}: {
  searchParams: WatchedMovieSearchParams;
}) {
  return (
    <Suspense fallback={<Loading />}>
      <WatchedMoviesDetail searchParams={searchParams} />
    </Suspense>
  );
}
