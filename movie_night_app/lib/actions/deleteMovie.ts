'use server';

import { StoredMovie } from '../types/domain';
import { deleteMovie } from '../queries/movies';
import { mapDbErrorToActionResult } from '../db/errors/mapDbErrorToActionResult';
import { actionSuccess } from '../utils/messageHandling/actionResult';

export async function deleteMovieAction(movie: StoredMovie) {
  try {
    const result = await deleteMovie(movie.id);
    return actionSuccess(result);
  } catch (error) {
    return mapDbErrorToActionResult(error);
  }
}
