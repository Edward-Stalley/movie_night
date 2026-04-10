'use server';

import { revalidateTag } from 'next/cache';
import { deleteWatchedMovie } from '../queries/watched-movies';
import { WatchedMovie } from '../types/domain';
import { actionSuccess } from '../utils/messageHandling/actionResult';
import { mapDbErrorToActionResult } from '../db/errors/mapDbErrorToActionResult';

export async function deleteMovieFromWatchedAction(movie: WatchedMovie) {
  try {
    const result = await deleteWatchedMovie(movie.id);
    console.log('deleting watched');
    revalidateTag('movies', 'max');
    revalidateTag('watched-movies', 'max');

    return actionSuccess(result);
  } catch (error) {
    return mapDbErrorToActionResult(error);
  }
}
