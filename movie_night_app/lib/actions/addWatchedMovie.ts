'use server';

import { addWatchedMovie } from '@/lib/queries/watched-movies';
import { WatchedMovieInsert } from '../types/db';
import { revalidatePath} from 'next/cache';
import { actionSuccess } from '../utils/messageHandling/actionResult';
import { mapDbErrorToActionResult } from '../db/errors/mapDbErrorToActionResult';

export async function addWatchedMovieAction({ movieId, watchedOn, chosenBy }: WatchedMovieInsert) {

  try {
    const result = await addWatchedMovie({ movieId, watchedOn, chosenBy });

    revalidatePath('/movies');
    revalidatePath('/watched-movies');

    return actionSuccess(result.id);
  } catch (error) {
    return mapDbErrorToActionResult(error);
  }
}
