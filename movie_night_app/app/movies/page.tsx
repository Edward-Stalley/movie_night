import { Suspense } from 'react';
import MoviesContent from './Content';
import { MovieSearchParams } from '@/lib/types/params';
import Loading from '../components/layout/Loading';

export default async function Movies({ searchParams }: { searchParams: MovieSearchParams }) {
  return (
    <Suspense fallback={<Loading />}>
      <MoviesContent searchParams={searchParams} />
    </Suspense>
  );
}
