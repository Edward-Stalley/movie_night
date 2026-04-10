import { Suspense } from 'react';
import VotingSessionsContent from './Content';
import Loading from '@/app/components/layout/Loading';

export default function VotingSessions() {
  return (
    <Suspense fallback={<Loading />}>
      <VotingSessionsContent />
    </Suspense>
  );
}
