// # Reorganises data from either Database or API into correct data structure / shape.

import type {
  DBUserRow,
  MovieRow,
  VoteSessionMovieRow,
  VoteSessionRow,
  WatchedMovieRow,
} from '@/lib/types/db';
import { TMDBMovie } from '@/lib/types/tmdb';
import {
  SearchedMovie,
  StoredMovie,
  User,
  VoteSession,
  VoteSessionWithMovie,
  WatchedMovie,
} from '@/lib/types/domain';

// #1 DB rows (snakecase) → Domain objects (camelCase)

// ## Watched Movies (Movie Row + JOIN Review)

// Takes Array of SAME WATCHED MOVIE and restructures it for Domain Display.

export function toWatchedMovieBase(row: WatchedMovieRow): WatchedMovie {
  return {
    id: row.id,
    movieId: row.movieId,
    tmdbId: row.tmdbId,
    watchedOn: new Date(row.watchedOn),
    username: row.username,
    chosenBy: row.chosenBy,
    chosenByImage: row.chosenByImage,
    reviews: [],
    overview: row.overview,
    genreIds: row.genreIds,
    title: row.title,
    posterPath: row.posterPath,
    releaseDate: new Date(row.releaseDate),
    trailerUrl: row.trailerUrl,
  };
}

export function toReview(row: WatchedMovieRow) {
  return {
    ratedBy: row.ratedBy!,
    rating: row.rating!,
    comment: row.comment!,
  };
}

export function toWatchedMovies(rows: WatchedMovieRow[]): WatchedMovie[] {
  const moviesMap = new Map<number, WatchedMovie>();

  for (const row of rows) {
    if (!moviesMap.has(row.id)) {
      moviesMap.set(row.id, toWatchedMovieBase(row));
    }

    if (row.ratedBy) {
      moviesMap.get(row.id)!.reviews.push(toReview(row));
    }
  }

  return Array.from(moviesMap.values());
}

// ## General Movies (MovieRow → StoredMovie)

export function toStoredMovies(row: MovieRow): StoredMovie {
  return {
    id: row.id,
    tmdbId: row.tmdbId,
    overview: row.overview,
    genreIds: row.genreIds,
    title: row.title,
    posterPath: row.posterPath,
    releaseDate: new Date(row.releaseDate),
    addedBy: row.addedBy,
    trailerUrl: row.trailerUrl,
    addedOn: row.addedOn,
  };
}

// ## Searched Movies (TMDB Movie → SearchedMovie )

export function toSearchedMovie(movie: TMDBMovie): SearchedMovie {
  return {
    tmdbId: movie.id,
    title: movie.title,
    overview: movie.overview,
    releaseDate: new Date(movie.release_date),
    posterPath: movie.poster_path,
    genreIds: movie.genre_ids,
    trailerUrl: movie.trailer_url,
  };
}

// ## User (DBUserRow → User)

export function toUser(row: DBUserRow): User {
  return {
    id: String(row.id),
    name: row.name,
    image: row.image,
  };
}

// ## Dates (Date → String: 2025-09-20)

// Fri Mar 06 2026 09:00:00 GMT+0900 (Japan Standard Time)
// →
// 2026-03-06

export function toIso(date: Date) {
  return date.toISOString().split('T')[0];
}

//  Voting

export function toVoteSessionMovie(rows: VoteSessionMovieRow[]): VoteSessionWithMovie | null {
  if (rows.length === 0) return null;

  return {
    id: rows[0].id,
    movieNightDate: new Date(rows[0].movieNightDate),
    createdBy: rows[0].createdBy,
    createdAt: rows[0].createdAt,

    movies: rows.map((row) => ({
      id: row.movieId,
      title: row.title,
      posterPath: row.posterPath,
    })),
  };
}

export function toVoteSession(rows: VoteSessionRow): VoteSession {
  console.log(typeof rows.movieNightDate, rows.movieNightDate);
  return {
    id: rows.id,
    movieNightDate: new Date(rows.movieNightDate),
    createdBy: rows.createdBy,
    createdAt: rows.createdAt,
  };
}
