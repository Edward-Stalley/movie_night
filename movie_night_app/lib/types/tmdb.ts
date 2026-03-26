// # From TMDB API (before transformed locally) so in snake_case.

export type TMDBMovie = {
  id: number; // # Will Become 'tmdb_id'
  title: string | null;
  poster_path: string | null;
  genre_ids: number[] | null;
  overview: string | null;
  release_date: string;
  trailer_url: string;
};
