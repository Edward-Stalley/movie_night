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
  rating: number | null;
  ratedBy: string | null;
  comment: string | null;
}

export interface WatchedMovie extends MovieBase {
  id: number; // Watched Movie ID
  tmdbId: number; // TMDB ID
  movieId: number; // Movies ID
  watchedOn: Date;
  chosenBy: string;
  username: string;
  reviews: Review[];
}

export interface ShortlistedMovie extends MovieBase {
  id: number;
  tmdbId: number;
  addedBy: Date;
  username: string;
}

export interface StoredMovie extends MovieBase {
  id: number;
  tmdbId: number;
}

export type MovieInsert = Omit<StoredMovie, "id">;

export interface WatchedMovieCardProps {
  movie: WatchedMovie;
  isDetailScreen: boolean;
  layout: string | null;
}
