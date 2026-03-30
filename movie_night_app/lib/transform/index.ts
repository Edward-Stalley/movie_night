// # Reorganises data from either Database or API into correct data structure / shape.

import type {
  DBUserRow,
  MovieRow,
  MovieNightSessionWithMovieRow,
  MovieNightSessionRow,
  WatchedMovieRow,
  VoteRow,
} from '@/lib/types/db';
import { TMDBMovieApi } from '@/lib/types/tmdb';
import {
  SearchedMovie,
  StoredMovie,
  TMDBMovie,
  User,
  VoteSession,
  VoteSessionWithMovie,
  WatchedMovie,
} from '@/lib/types/domain';
import { Vote } from '@/lib/types/ui';
import getUserFromId from '@/lib/utils/users/getUsersFromIds';
import { mapStatusToDomain } from '@/lib/transform/voteSessionStatus';

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
    chosenById: row.chosenById,
    chosenByName: row.chosenByName,
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
    ratedByName: row.ratedByName!,
    ratedByImage: row.ratedByImage!,
    ratedById: row.ratedById!,
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

    if (row.ratedById) {
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

// ## Searched Movies (TMDB Movie API → TMDB Movie)

export function toTMDBMovie(tmdbMovieApi: TMDBMovieApi): TMDBMovie {
  return {
    id: tmdbMovieApi.id,
    title: tmdbMovieApi.title,
    overview: tmdbMovieApi.overview,
    releaseDate: tmdbMovieApi.release_date,
    posterPath: tmdbMovieApi.poster_path,
    genreIds: tmdbMovieApi.genre_ids,
    trailerUrl: tmdbMovieApi.trailer_url,
  };
}

// ## Searched Movies (TMDB Movie → SearchedMovie )

export function toSearchedMovie(movie: TMDBMovie): SearchedMovie {
  return {
    tmdbId: movie.id,
    title: movie.title,
    overview: movie.overview,
    releaseDate: new Date(movie.releaseDate),
    posterPath: movie.posterPath,
    genreIds: movie.genreIds,
    trailerUrl: movie.trailerUrl,
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

export function toVoteSessionMovie(
  rows: MovieNightSessionWithMovieRow[],
): VoteSessionWithMovie | null {
  if (rows.length === 0) return null;

  return {
    id: rows[0].id,
    movieNightDate: new Date(rows[0].movieNightDate),
    createdBy: rows[0].createdBy,
    createdAt: rows[0].createdAt,
    status: mapStatusToDomain(rows[0].status),
    movies: rows.map((row) => ({
      id: row.movieId,
      title: row.title,
      posterPath: row.posterPath,
    })),
  };
}

export function toVoteSession(rows: MovieNightSessionRow): VoteSession {
  return {
    id: rows.id,
    movieNightDate: new Date(rows.movieNightDate),
    createdBy: rows.createdBy,
    createdAt: rows.createdAt,
    status: mapStatusToDomain(rows.status),
  };
}

export function toVote(rows: VoteRow): Vote {
  return {
    id: rows.id,
    voteSessionId: rows.vote_session_id,
    userId: rows.user_id,
    movieId: rows.movie_id,
  };
}

export function countVotesByMovie(votes: Vote[], users: User[]) {
  const movieMap = new Map<number, { count: number; users: User[] }>();

  votes.forEach((vote) => {
    const user = getUserFromId(vote.userId, users);

    const entry = movieMap.get(vote.movieId) ?? { count: 0, users: [] };
    entry.count += 1;
    entry.users.push(user);

    movieMap.set(vote.movieId, entry);
  });

  return Array.from(movieMap.entries()).map(([movieId, { count, users }]) => ({
    movieId,
    count,
    users,
  }));
}
