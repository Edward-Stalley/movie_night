// # From mysql Database. 
// # "snake_case" is converted to "camelCase" in the SQL Query in "@/lib/queries".

export interface MovieRow {
  id: number;
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
