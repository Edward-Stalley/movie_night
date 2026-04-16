'use server';

import { revalidatePath } from 'next/cache';
import { closeVotingSession } from '../queries/vote';

export async function closeVotingSessionAction(
  voteSessionId: number,
  winningMovieId: number | null,
) {
  const votingSessionStatus = await closeVotingSession({ voteSessionId, winningMovieId });

  revalidatePath(`/vote-session/sessions/${voteSessionId}`);

  return votingSessionStatus;
}
