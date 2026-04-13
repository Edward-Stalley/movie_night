'use server';

import { WatchedMovie } from '../types/domain';
import { deleteWatchedMovie } from '../queries/watched-movies';
import { mapDbErrorToActionResult } from '../db/errors/mapDbErrorToActionResult';
import { actionSuccess } from '../utils/messageHandling/actionResult';

export async function deleteMovieFromWatchedAction(movie: WatchedMovie) {
  try {
    const result = await deleteWatchedMovie(movie.id);
    return actionSuccess(result);
  } catch (error) {
    return mapDbErrorToActionResult(error);
  }
}
