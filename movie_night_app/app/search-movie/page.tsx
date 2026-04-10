import { Suspense } from 'react';
import MoviesContent from './Content';
import { SearchMovieSearchParams } from '@/lib/types/params';
import Loading from '../components/layout/Loading';

export default async function SearchMovie({
  searchParams,
}: {
  searchParams: SearchMovieSearchParams;
}) {
  return (
    <Suspense fallback={<Loading />}>
      <MoviesContent searchParams={searchParams} />
    </Suspense>
  );
}
