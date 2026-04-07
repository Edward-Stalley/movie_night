import { MovieSortValue, SortOrder } from '@/lib/types/sort';
import { Suspense } from 'react';
import VotingContent from './Content';

type SearchParams = {
  page?: string;
  sort?: MovieSortValue;
  order?: SortOrder;
  selected?: string;
};

export default function Vote({ searchParams }: { searchParams: SearchParams }) {
  return (
    <Suspense fallback={<div>Loading Content...</div>}>
      <VotingContent searchParams={searchParams} />
    </Suspense>
  );
}
