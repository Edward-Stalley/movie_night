import { MovieSortValue, SortOrder } from '@/lib/types/sort';
import { Suspense } from 'react';
import VotingContent from './Content';
import Loading from '@/app/components/layout/Loading';

type SearchParams = {
  page?: string;
  sort?: MovieSortValue;
  order?: SortOrder;
  selected?: string;
};

export default function Vote({ searchParams }: { searchParams: SearchParams }) {
  return (
    <Suspense fallback={<Loading />}>
      <VotingContent searchParams={searchParams} />
    </Suspense>
  );
}
