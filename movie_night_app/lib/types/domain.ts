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

export interface ReviewInsert {
  watchedMovieId: number;
  userId: number; // ratedBy on Client Side // this is actually name on client side. convert to id later.
  rating: number | null;
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
  loggedInUser?: LoggedInUser;
}

// export type LoggedInUser = string | null | undefined;

export interface LoggedInUser {
  id: string;
  name: string;
  image: string;
}

export type UserId = number;

export interface IconClassNameProps {
  className?: string;
  fill?: string;
}

export interface StarRatingProps {
  rating: number | null | undefined;
  max?: number;
  onClick?: (rating: number) => void;
}
