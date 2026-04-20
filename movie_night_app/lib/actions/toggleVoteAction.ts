'use server';

import {
  addVote,
  deleteVote,
  getVoteByUserMovieSession,
  getVoteSessionStatus,
} from '@/lib/queries/vote';
import { VoteKey } from '../types/db';
import { revalidatePath } from 'next/cache';

export async function toggleVoteAction({ voteSessionId, userId, movieId }: VoteKey) {
  const status = await getVoteSessionStatus(voteSessionId);

  if (!status) {
    throw new Error('Voting session not found');
  }

  if (status !== 'in_progress') {
    throw new Error('Voting has closed');
  }

  const existingVote = await getVoteByUserMovieSession({ voteSessionId, userId, movieId });

  if (existingVote) {
    await deleteVote(existingVote.id);
  } else {
    await addVote({ voteSessionId, userId, movieId });
  }
  revalidatePath(`/vote-session/sessions/${voteSessionId}`);
  return { success: 'true' };
}
