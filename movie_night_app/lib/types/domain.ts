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

// export type LoggedInUser = string | null | undefined;

export interface LoggedInUser extends User {
  // May Need to Add Extra Fields Later...
}
export interface User {
  id: string;
  name: string;
  image: string;
}

export type UserId = number;

// -------------
// PROPS
// -------------

export interface IconClassNameProps {
  className?: string;
  fill?: string;
}

export interface StarRatingProps {
  rating: number | null | undefined;
  max?: number;
  onClick?: (rating: number) => void;
  isEditing: boolean;
}

export interface WatchedMovieCardProps {
  movie: WatchedMovie;
  isDetailScreen: boolean;
  layout: string | null;
  loggedInUser?: LoggedInUser;
  users: User[];
}

export type IconProps = React.SVGProps<SVGSVGElement>;

export interface WatchedMoviesProps {
  movies: WatchedMovie[];
  loggedInUser?: LoggedInUser;
  users: User[];
}
