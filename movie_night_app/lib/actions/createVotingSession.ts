'use server';
import { createVotingSession } from '@/lib/queries/vote';
import { revalidateTag } from 'next/cache';

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
    throw new Error('Invalid  Data');
  }

  const result = await createVotingSession({ movieNightDate, movieIds, createdBy });
  revalidateTag('vote-sessions', 'max');

  return result;
}
