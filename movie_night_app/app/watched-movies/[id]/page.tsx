import { Suspense } from 'react';
import WatchedMovieContent from './WatchedMovieContent';
import Loading from '@/app/components/layout/Loading';

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  return (
    <Suspense fallback={<Loading />}>
      <WatchedMovieContent params={params} />
    </Suspense>
  );
}
