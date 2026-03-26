// # From mysql Database.
// # "snake_case" is converted to "camelCase" in the SQL Query in "@/lib/queries".

import { StoredMovie } from './domain';
import { SortOrder } from './pagination';

// ----------------
// ROWS
// ----------------

export type WatchedMovieRow = {
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
};

export type MovieRow = {
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
};

export type VoteSessionMovieRow = {
  id: number;
  createdBy: number;
  createdAt: Date;
  movieId: number;
  movieNightDate: Date;
  title: string;
  posterPath: string;
};

export type VoteSessionRow = {
  id: number;
  createdBy: number;
  movieNightDate: Date;
  createdAt: Date;
};

export type DBUserRow = {
  id: number;
  name: string;
  image: string;
  provider: string;
  providerAccountId: string;
};

// ------------------
// INSERTS / UPDATES
// ------------------

export type MovieInsert = Omit<StoredMovie, 'id'>;
export type DBUserInsert = {
  name: string;
  image: string;
  provider: string;
  providerAccountId: string;
};

export type MoviesQuery = {
  limit: number;
  offset: number;
  sortBy: string;
  order: SortOrder;
};
export type ReviewInsert = {
  watchedMovieId: number;
  userId: number; // ratedBy on Client Side // this is actually name on client side. convert to id later.
  rating: number | null;
  comment: string | null;
};

export type WatchedMovieInsert = {
  movieId: number; // Movies ID
  watched_on: string | null;
  chosenBy: string | null;
};

export type VoteInsert = {
  voteSessionId: number;
  userId: number;
  movieId: number;
};

export type WatchedMovieUpdate = {
  chosenBy?: number;
  watchedOn?: string;
};

export type WatchedMoviesQuery = {
  limit: number;
  offset: number;
  sortBy: string;
  order: string;
};

export type QueryParams = {
  page?: string;
  sort?: string;
  order?: string;
};
