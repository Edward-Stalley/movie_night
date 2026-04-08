'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function VoteSessionListener({ voteSessionId }: { voteSessionId: number }) {
  const router = useRouter();
  useEffect(() => {
    const evtSource = new EventSource('/api/events');

    const handleVoteUpdate = (e: MessageEvent) => {
      const updatedSessionId = Number(e.data);
      if (updatedSessionId === voteSessionId) {
        router.refresh();
      }
    };

    evtSource.addEventListener('votes-updated', handleVoteUpdate);

    return () => {
      evtSource.removeEventListener('votes-updated', handleVoteUpdate);
      evtSource.close();
    };
  }, [voteSessionId, router]);

  return null;
}
