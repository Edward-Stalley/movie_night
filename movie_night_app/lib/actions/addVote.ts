'use server';

import { addVote } from '../queries/vote';
import { VoteInsert } from '../types/db';

export async function addVoteAction({ voteSessionId, userId, movieId }: VoteInsert) {
  const vote = await addVote({ voteSessionId, userId, movieId });
  return vote;
}
