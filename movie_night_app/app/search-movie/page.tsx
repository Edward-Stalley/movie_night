import { Suspense } from 'react';
import MoviesContent from './Content';
import { SearchMovieSearchParams } from '@/lib/types/params';

export default async function SearchMovie({
  searchParams,
}: {
  searchParams: SearchMovieSearchParams;
}) {
  return (
    <Suspense fallback={<div>Loading movies...</div>}>
      <MoviesContent searchParams={searchParams} />
    </Suspense>
  );
}
