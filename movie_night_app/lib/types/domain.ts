// # Used in the application

export interface SearchedMovie {
  id: number; // === tmdb_id
  originalTitle: string | null;
  overview: string | null;
  releaseDate: Date;
  posterPath: string | null;
  genreIds: number[] | null;
}

export interface Review {
  rating: number | null;
  ratedBy: string | null;
  comment: string | null;
}

export interface WatchedMovie {
  id: number;
  tmdbId: number;
  watchedOn: Date;
  chosenBy: string;
  username: string;
  reviews: Review[];
  genreIds: number[] | null;
  originalTitle: string | null;
  overview: string | null;
  releaseDate: Date;
  posterPath: string | null;
}

export interface StoredMovie {
  id: number;
  tmdbId: number;
  originalTitle: string | null;
  overview: string | null;
  releaseDate: Date;
  posterPath: string | null;
  genreIds: number[] | null;
}
