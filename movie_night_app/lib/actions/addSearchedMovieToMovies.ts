'use server';

import { MovieInsert } from '@/lib/types/db';
import { SearchedMovie } from '@/lib/types/domain';
import { getTrailerForMovie } from '@/lib/external/tmdb';
import { addMovie } from '@/lib/queries/movies';
// import { revalidatePath } from 'next/cache';
import { mapDbErrorToActionResult } from '../db/errors/mapDbErrorToActionResult';
import { actionSuccess } from '../utils/messageHandling/actionResult';

export async function addSearchedMovieToMoviesAction(searchedMovie: SearchedMovie, userId: number) {
  try {
    const trailerUrl = await getTrailerForMovie(searchedMovie.tmdbId);

    const movieData: MovieInsert = {
      title: searchedMovie.title,
      tmdbId: searchedMovie.tmdbId,
      posterPath: searchedMovie.posterPath,
      genreIds: searchedMovie.genreIds,
      overview: searchedMovie.overview,
      releaseDate: searchedMovie.releaseDate,
      trailerUrl,
      addedBy: userId,
      addedOn: new Date(),
    };

    // revalidatePath('/movies');

    const result = await addMovie(movieData);
    return actionSuccess(result.id);
  } catch (error) {
    return mapDbErrorToActionResult(error);
  }
}
