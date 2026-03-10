// # Reorganises data from either Database or API into correct data structure / shape.

import type { MovieRow } from "@/lib/types/db";
import { TMDBMovie } from "@/lib/types/tmdb";
import { SearchedMovie, StoredMovie, WatchedMovie } from "@/lib/types/domain";

// #1 DB rows (snakecase) → Domain objects (camelCase)

// ## Watched Movies

// Takes Array of SAME WATCHED MOVIE and restructures it for Domain Display.
export function groupWatchedMovies(rows: MovieRow[]): WatchedMovie[] {
  const moviesMap = new Map<number, WatchedMovie>();

  for (const row of rows) {
    if (!moviesMap.has(row.id)) {
      moviesMap.set(row.id, {
        id: row.id,
        movieId: row.movieId,
        tmdbId: row.tmdbId,
        watchedOn: new Date(row.watchedOn),
        username: row.username,
        chosenBy: row.chosenBy,
        reviews: [],
        overview: row.overview,
        genreIds: row.genreIds,
        originalTitle: row.originalTitle,
        posterPath: row.posterPath,
        releaseDate: new Date(row.releaseDate),
      });
    }

    if (row.ratedBy) {
      const review = {
        ratedBy: row.ratedBy,
        rating: row.rating!,
        comment: row.comment!,
      };
      moviesMap.get(row.id)!.reviews.push(review);
    }
  }

  return Array.from(moviesMap.values());
}

// ## General Movies (Movie List)

export function groupMovies(rows: MovieRow[]): StoredMovie[] {
  const moviesMap = new Map<number, StoredMovie>();
  for (const row of rows) {
    if (!moviesMap.has(row.tmdbId)) {
      moviesMap.set(row.id, {
        id: row.id,
        tmdbId: row.tmdbId,
        overview: row.overview,
        genreIds: row.genreIds,
        originalTitle: row.originalTitle,
        posterPath: row.posterPath,
        releaseDate: new Date(row.releaseDate),
      });
    }
  }

  const movieList = Array.from(moviesMap.values());
  return Array.from(moviesMap.values());
}

// #2 External API → Domain objects

export function transformSearchedMovies(
  movieResults: TMDBMovie[],
): SearchedMovie[] {
  const moviesMap = new Map<number, SearchedMovie>();

  for (const movie of movieResults) {
    if (!moviesMap.has(movie.id)) {
      moviesMap.set(movie.id, {
        id: movie.id, // === tmdb_id
        originalTitle: movie.original_title,
        overview: movie.overview,
        releaseDate: new Date(movie.release_date),
        posterPath: movie.poster_path,
        genreIds: movie.genre_ids,
      });
    }
  }
  const testArray = Array.from(moviesMap.values());
  return Array.from(moviesMap.values());
}
