import { Suspense } from 'react';
import VotingSessionContent from './Content';
import Loading from '@/app/components/layout/Loading';

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  return (
    <Suspense fallback={<Loading />}>
      <VotingSessionContent params={params} />
    </Suspense>
  );
}
