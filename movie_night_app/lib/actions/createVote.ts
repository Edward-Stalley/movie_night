'use server';

import { createVoteSession } from '@/lib/queries/vote';
import { redirect } from 'next/navigation';

type CreateVoteQuery = {
  movieNightDate: string;
  movieIds: number[];
  createdBy: number;
};
export async function createVote({ movieNightDate, movieIds, createdBy }: CreateVoteQuery) {
  if (!movieNightDate || movieIds.length === 0) {
    throw new Error('Invalid vote data');
  }

  const voteSessionId = await createVoteSession({ movieNightDate, movieIds, createdBy });

  return voteSessionId;
}
