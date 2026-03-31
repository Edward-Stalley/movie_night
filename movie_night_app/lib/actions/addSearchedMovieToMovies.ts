import { MovieInsert } from '@/lib/types/db';
import { SearchedMovie } from '@/lib/types/domain';
import { getTrailerForMovie } from '@/lib/external/tmdb';
import { addMovie } from '@/lib/queries/movies';

export async function addSearchedMovieToMoviesAction(searchedMovie: SearchedMovie, userId: number) {
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

  return await addMovie(movieData);
}
