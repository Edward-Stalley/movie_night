// # From Database.
// # "snake_case" is converted to "camelCase" in the SQL Query in "@/lib/queries".

import { StoredMovie } from '@/lib/types/domain';
import { SortOrder } from '@/lib/types/sort';

// ----------------
// ROWS
// ----------------

export type WatchedMovieRow = {
  id: number;
  movieId: number;
  tmdbId: number;
  watchedOn: Date;
  chosenById: number;
  chosenByName: string;
  chosenByImage: string;
  username: string;
  rating: number | null;
  ratedById: number | null;
  ratedByName: string | null;
  ratedByImage: string | null;
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

export type MovieNightSessionWithMovieRow = {
  id: number;
  createdBy: number;
  createdAt: Date;
  movieId: number;
  movieNightDate: Date;
  status: VoteSessionStatus;
  title: string;
  posterPath: string;
};

export type MovieNightSessionRow = {
  id: number;
  createdBy: number;
  movieNightDate: Date;
  createdAt: Date;
  status: VoteSessionStatus;
};

export type VoteSessionStatus = 'in_progress' | 'completed';

export type VoteRow = {
  id: number;
  vote_session_id: number;
  user_id: number;
  movie_id: number;
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
  watchedOn: string | null;
  chosenBy: string | null;
};

export type VoteKey = {
  voteSessionId: number;
  userId: number;
  movieId: number;
};

export type VoteSessionFilter = {
  voteSessionId: number;
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
