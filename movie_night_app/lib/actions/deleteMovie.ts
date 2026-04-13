'use server';

import { StoredMovie } from '../types/domain';
import { deleteMovie } from '../queries/movies';
// import { revalidatePath, revalidateTag } from 'next/cache';
import { mapDbErrorToActionResult } from '../db/errors/mapDbErrorToActionResult';
import { actionSuccess } from '../utils/messageHandling/actionResult';

export async function deleteMovieAction(movie: StoredMovie) {
  console.log('in delete action', movie);

  try {
    const result = await deleteMovie(movie.id);

    // revalidatePath('/movies');
    // revalidatePath('/watched-movies');

    return actionSuccess(result);
  } catch (error) {
    console.log('in here error', error);
    return mapDbErrorToActionResult(error);
  }
}
