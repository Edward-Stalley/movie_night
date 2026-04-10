import { Suspense } from 'react';
import WatchedMovieDetail from './WatchedMovieDetail';
import Loading from '@/app/components/layout/Loading';

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  return (
    <Suspense fallback={<Loading />}>
      <WatchedMovieDetail params={params} />
    </Suspense>
  );
}
