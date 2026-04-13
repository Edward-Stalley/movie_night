'use server';

import { revalidatePath } from 'next/cache';
import { closeVotingSession } from '../queries/vote';

export async function closeVotingSessionAction(voteSessionId: number) {
  const votingSessionStatus = await closeVotingSession({ voteSessionId });

  revalidatePath(`/vote-session/sessions/${voteSessionId}`);

  return votingSessionStatus;
}
