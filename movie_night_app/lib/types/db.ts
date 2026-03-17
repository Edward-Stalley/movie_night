// # From mysql Database.
// # "snake_case" is converted to "camelCase" in the SQL Query in "@/lib/queries".

import { StoredMovie } from './domain';

// ----------------
// ROWS
// ----------------

export interface WatchedMovieRow {
  id: number;
  movieId: number;
  tmdbId: number;
  watchedOn: Date;
  chosenBy: string;
  username: string;
  rating: number | null;
  ratedBy: string | null;
  comment: string | null;
  genreIds: number[] | null;
  originalTitle: string | null;
  overview: string | null;
  releaseDate: Date;
  posterPath: string | null;
}

export interface MovieRow {
  id: number;
  originalTitle: string | null;
  genreIds: number[] | null;
  overview: string | null;
  releaseDate: Date;
  posterPath: string | null;
  tmdbId: number;
  // addedBy: string;
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

export interface WatchedMovieUpdate {
  chosenBy?: number;
  watchedOn?: string;
}
