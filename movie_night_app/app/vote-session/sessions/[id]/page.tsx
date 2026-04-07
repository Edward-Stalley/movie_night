import { Suspense } from 'react';
import VotingSessionContent from './VotingSessionContent';

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  return (
    <Suspense>
      <VotingSessionContent params={params} />
    </Suspense>
  );
}
