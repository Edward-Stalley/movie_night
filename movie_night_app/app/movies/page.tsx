import { Suspense } from 'react';
import MoviesContent from './Content';
import { MovieSearchParams } from '@/lib/types/params';

export default async function Movies({ searchParams }: { searchParams: MovieSearchParams }) {
  return (
    <Suspense fallback={<div>Loading movies...</div>}>
      <MoviesContent searchParams={searchParams} />
    </Suspense>
  );
}
