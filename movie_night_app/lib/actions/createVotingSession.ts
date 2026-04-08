'use server';
import { createVotingSession } from '@/lib/queries/vote';
import { revalidateTag } from 'next/cache';
import { notifySessionsUpdated } from '@/lib/realtime/postgresEvents';

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
  revalidateTag('vote-sessions', 'max');
  await notifySessionsUpdated();
  console.log('running notify session?');

  return voteSessionId;
}
