'use server';

// import { revalidateTag } from 'next/cache';
import { closeVotingSession } from '../queries/vote';

export async function closeVotingSessionAction(voteSessionId: number) {
  console.log('in close sessions');
  const votingSessionStatus = await closeVotingSession({ voteSessionId });
  // revalidateTag('movies', 'max');
  // revalidateTag('watched-movies', 'max');
  return votingSessionStatus;
}
