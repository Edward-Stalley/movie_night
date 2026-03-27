'use server';

import { closeVotingSession } from '../queries/vote';

export async function closeVotingSessionAction(voteSessionId: number) {
  const votingSessionStatus = await closeVotingSession({ voteSessionId });
  return votingSessionStatus;
}
