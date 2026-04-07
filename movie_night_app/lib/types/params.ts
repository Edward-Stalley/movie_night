import { MovieSortValue, SearchedMovieSortValue, SortOrder, WatchedMovieSortValue } from './sort';

export type MovieSearchParams = {
  page?: string;
  sort?: MovieSortValue;
  order?: SortOrder;
};

export type SearchMovieSearchParams = {
  query?: string;
  page?: string;
  sort?: SearchedMovieSortValue;
  order?: SortOrder;
};

export type WatchedMovieSearchParams = {
  page?: string;
  sort?: WatchedMovieSortValue;
  order?: SortOrder;
};
