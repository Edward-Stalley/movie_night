'use server';

import { createVotingSession } from '@/lib/queries/vote';

type CreateVotingSessionQuery = {
  movieNightDate: string;
  movieIds: number[];
  createdBy: number;
};

export async function createVotingSessionAction({
  movieNightDate,
  movieIds,
  createdBy,
}: CreateVotingSessionQuery) {
  if (!movieNightDate || movieIds.length === 0) {
    throw new Error('Invalid vote data');
  }

  const voteSessionId = await createVotingSession({ movieNightDate, movieIds, createdBy });

  return voteSessionId;
}
