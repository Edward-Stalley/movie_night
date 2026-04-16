// # Used in the application

export type MovieBase = {
  title: string | null;
  overview: string | null;
  releaseDate: Date;
  posterPath: string | null;
  genreIds: number[] | null;
  trailerUrl?: string | null;
  addedBy?: number | null;
};

export type SearchedMovie = MovieBase & {
  tmdbId: number; // === tmdb_id
};

export type Review = {
  rating: number;
  ratedById: number;
  ratedByName: string;
  ratedByImage: string;
  comment: string | null;
};

export type WatchedMovie = MovieBase & {
  id: number; // Watched Movie ID
  movieId: number; // Movies ID
  watchedOn: Date;
  chosenById: number;
  chosenByName: string;
  chosenByImage: string;
  username: string;
  reviews: Review[];
  tmdbId: number; // TMDB ID
};

export type VoteSessionWithMovie = {
  id: number;
  movieNightDate: Date;
  createdBy: number;
  createdAt: Date;
  status: VoteSessionStatus;
  winningMovieId: number | null;
  movies: {
    id: number;
    title: string;
    posterPath: string;
  }[];
};

export type VoteSession = {
  id: number;
  movieNightDate: Date;
  createdBy: number;
  createdAt: Date;
  status: VoteSessionStatus;
  winningMovieId: number | null;
};

export type VoteSessionStatus = 'inProgress' | 'completed';

export type StoredMovie = MovieBase & {
  id: number;
  tmdbId: number; // TMDB ID
  addedBy: number;
  addedOn: Date;
};

export type LoggedInUser = User & {
  // May Need to Add Extra Fields Later...(currently identical to User. No new fields)
  // For the time being have placeholder to stop linter error
  _futureFields?: never;
};
export type User = {
  id: string;
  name: string;
  image: string;
};

export type UserId = number;

export type TMDBMovie = {
  id: number; // # Will Become 'tmdb_id'
  title: string | null;
  posterPath: string | null;
  genreIds: number[] | null;
  overview: string | null;
  releaseDate: string;
  trailerUrl: string | null;
};

export type PosterLayout = {
  id: number;
  title: string;
  src: string;
  colStart: string;
  rowStart: string;
  colSpan: string;
  rowSpan: string;
  rounding?: string;
};
