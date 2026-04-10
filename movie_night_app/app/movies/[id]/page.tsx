import { Suspense } from 'react';
import MovieDetailContent from './Content';
import Loading from '@/app/components/layout/Loading';

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  return (
    <Suspense fallback={<Loading />}>
      <MovieDetailContent params={params} />
    </Suspense>
  );
}
