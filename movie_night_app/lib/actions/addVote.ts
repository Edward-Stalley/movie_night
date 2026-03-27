'use server';

import { addVote } from '../queries/vote';
import { VoteKey } from '../types/db';

export async function addVoteAction({ voteSessionId, userId, movieId }: VoteKey) {
  const vote = await addVote({ voteSessionId, userId, movieId });
  return vote;
}
