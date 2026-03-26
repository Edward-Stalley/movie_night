// # From mysql Database.
// # "snake_case" is converted to "camelCase" in the SQL Query in "@/lib/queries".

import { StoredMovie } from './domain';
import { SortOrder } from './pagination';

// ----------------
// ROWS
// ----------------

export interface WatchedMovieRow {
  id: number;
  movieId: number;
  tmdbId: number;
  watchedOn: Date;
  chosenBy: string;
  chosenByImage: string;
  username: string;
  rating: number | null;
  ratedBy: string | null;
  comment: string | null;
  genreIds: number[] | null;
  title: string | null;
  overview: string | null;
  releaseDate: Date;
  posterPath: string | null;
  trailerUrl: string | null;
}

export interface MovieRow {
  id: number;
  title: string | null;
  genreIds: number[] | null;
  overview: string | null;
  releaseDate: Date;
  posterPath: string | null;
  tmdbId: number;
  addedBy: number;
  trailerUrl: string; // 未実装 Need to implement
  addedOn: Date;
}

export interface VoteSessionMovieRow {
  id: number;
  createdBy: number;
  createdAt: Date;
  movieId: number;
  movieNightDate: Date;
  title: string;
  posterPath: string;
}

export interface VoteSessionRow {
  id: number;
  createdBy: number;
  movieNightDate: Date;
  createdAt: Date;
}

export interface DBUserRow {
  id: number;
  name: string;
  image: string;
  provider: string;
  providerAccountId: string;
}

// ------------------
// INSERTS / UPDATES
// ------------------

export type MovieInsert = Omit<StoredMovie, 'id'>;
export interface DBUserInsert {
  name: string;
  image: string;
  provider: string;
  providerAccountId: string;
}

export interface MoviesQuery {
  limit: number;
  offset: number;
  sortBy: string;
  order: SortOrder;
}
export interface ReviewInsert {
  watchedMovieId: number;
  userId: number; // ratedBy on Client Side // this is actually name on client side. convert to id later.
  rating: number | null;
  comment: string | null;
}

export interface WatchedMovieInsert {
  movieId: number; // Movies ID
  watched_on: string | null;
  chosenBy: string | null;
}

export type VoteInsert = {
  voteSessionId: number;
  userId: number;
  movieId: number;
};

export interface WatchedMovieUpdate {
  chosenBy?: number;
  watchedOn?: string;
}

export interface WatchedMoviesQuery {
  limit: number;
  offset: number;
  sortBy: string;
  order: string;
}

export type QueryParams = {
  page?: string;
  sort?: string;
  order?: string;
};
