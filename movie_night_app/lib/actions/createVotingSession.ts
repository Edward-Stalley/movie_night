'use server';
import { createVotingSession } from '@/lib/queries/vote';
import { revalidateTag } from 'next/cache';
import { actionSuccess } from '../utils/messageHandling/actionResult';
import { mapDbErrorToActionResult } from '../db/errors/mapDbErrorToActionResult';

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
  try {
    if (!movieNightDate || movieIds.length === 0) {
      return { success: false, message: 'Invalid Data' };
    }

    const voteSessionId = await createVotingSession({ movieNightDate, movieIds, createdBy });
    revalidateTag('vote-sessions', 'max');
    return actionSuccess(voteSessionId);
  } catch (error) {
    return mapDbErrorToActionResult(error);
  }
}
