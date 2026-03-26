// # Used in the application

export interface MovieBase {
  title: string | null;
  overview: string | null;
  releaseDate: Date;
  posterPath: string | null;
  genreIds: number[] | null;
  trailerUrl?: string | null;
  addedBy?: number | null;
}

export interface SearchedMovie extends MovieBase {
  tmdbId: number; // === tmdb_id
}

export interface Review {
  rating: number;
  ratedBy: string;
  comment: string | null;
}

export interface WatchedMovie extends MovieBase {
  id: number; // Watched Movie ID
  movieId: number; // Movies ID
  watchedOn: Date;
  chosenBy: string;
  chosenByImage: string;
  username: string;
  reviews: Review[];
  tmdbId: number; // TMDB ID
}

export interface VoteSessionWithMovie {
  id: number;
  movieNightDate: Date;
  createdBy: number;
  createdAt: Date;
  movies: {
    id: number;
    title: string;
    posterPath: string;
  }[];
}

export interface VoteSession {
  id: number;
  movieNightDate: Date;
  createdBy: number;
  createdAt: Date;
}

export interface StoredMovie extends MovieBase {
  id: number;
  tmdbId: number; // TMDB ID
  addedBy: number;
  addedOn: Date;
}

export interface LoggedInUser extends User {
  // May Need to Add Extra Fields Later...(currently identical to User. No new fields)
  // For the time being have placeholder to stop linter error
  _futureFields?: never;
}
export interface User {
  id: string;
  name: string;
  image: string;
}

export type UserId = number;
