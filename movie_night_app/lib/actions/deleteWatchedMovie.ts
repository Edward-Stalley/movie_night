'use server';

import { WatchedMovie } from '../types/domain';
import { deleteWatchedMovie } from '../queries/watched-movies';
import { revalidatePath, revalidateTag } from 'next/cache';
import { mapDbErrorToActionResult } from '../db/errors/mapDbErrorToActionResult';
import { actionSuccess } from '../utils/messageHandling/actionResult';

export async function deleteMovieFromWatchedAction(movie: WatchedMovie) {
  try {
    const result = await deleteWatchedMovie(movie.id);

    // revalidatePath('/movies');
    // revalidatePath('/watched-movies');

    // revalidateTag('watched-movies', 'max');
    // revalidateTag('movies', 'max');
    console.log('in delete watchd movie delete  action', movie);
    return actionSuccess(result);
  } catch (error) {
    console.log('in here error', error);
    return mapDbErrorToActionResult(error);
  }
}
