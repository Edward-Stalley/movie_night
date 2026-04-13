'use server';

import { addVote, deleteVote, getVoteByUserMovieSession } from '@/lib/queries/vote';
import { VoteKey } from '../types/db';
import { revalidatePath } from 'next/cache';

export async function toggleVoteAction({ voteSessionId, userId, movieId }: VoteKey) {
  const existingVote = await getVoteByUserMovieSession({ voteSessionId, userId, movieId });
  if (existingVote) {
    await deleteVote(existingVote.id, voteSessionId);
  } else {
    await addVote({ voteSessionId, userId, movieId });
  }
  revalidatePath(`/vote-session/sessions/${voteSessionId}`);
  return { success: 'true' };
}
