// # Used in the application

export interface MovieBase {
  originalTitle: string | null;
  overview: string | null;
  releaseDate: Date;
  posterPath: string | null;
  genreIds: number[] | null;
}

export interface SearchedMovie extends MovieBase {
  id: number; // === tmdb_id
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
  username: string;
  reviews: Review[];
  tmdbId: number; // TMDB ID
}

export interface ShortlistedMovie extends MovieBase {
  id: number;
  addedBy: Date;
  username: string;
  tmdbId: number; // TMDB ID
}

export interface StoredMovie extends MovieBase {
  id: number;
  tmdbId: number; // TMDB ID
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
