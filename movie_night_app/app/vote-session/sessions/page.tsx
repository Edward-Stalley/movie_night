import { Suspense } from 'react';
import VotingSessionsContent from './Content';

export default function VotingSessions() {
  return (
    <Suspense fallback={<div>Loading Sessions...</div>}>
      <VotingSessionsContent />
    </Suspense>
  );
}
