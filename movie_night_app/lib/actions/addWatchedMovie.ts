'use server';

import { addWatchedMovie } from '@/lib/queries/watched-movies';
import { WatchedMovieInsert } from '../types/db';
import { revalidatePath, revalidateTag } from 'next/cache';
import { actionSuccess } from '../utils/messageHandling/actionResult';
import { mapDbErrorToActionResult } from '../db/errors/mapDbErrorToActionResult';

export async function addWatchedMovieAction({ movieId, watchedOn, chosenBy }: WatchedMovieInsert) {
  console.log('before try');

  try {
    const result = await addWatchedMovie({ movieId, watchedOn, chosenBy });

    // console.log('REVALIDATING MOVIES PATH');
    revalidatePath('/movies');
    revalidatePath('/watched-movies');

    return actionSuccess(result.id);
  } catch (error) {
    return mapDbErrorToActionResult(error);
  }
}
