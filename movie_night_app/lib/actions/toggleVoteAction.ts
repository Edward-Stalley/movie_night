'use server';

import { addVote, deleteVote, getVoteByUserMovieSession } from '@/lib/queries/vote';
import { VoteInsert } from '../types/db';

export async function toggleVoteAction({ voteSessionId, userId, movieId }: VoteInsert) {
  const existingVote = await getVoteByUserMovieSession({ voteSessionId, userId, movieId });

  if (existingVote) {
    await deleteVote(existingVote.id);
    return { action: 'removed' };
  }

  await addVote({ voteSessionId, userId, movieId });
  return { action: 'added' };
}
