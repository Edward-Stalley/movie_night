// # From TMDB API (before transformed locally) so in snake_case.

export type TMDBMovieApi = {
  id: number; // # Will Become 'tmdb_id'
  title: string | null;
  poster_path: string | null;
  genre_ids: number[] | null;
  overview: string | null;
  release_date: string;
  trailer_url: string | null;
};

export type TMDBVideo = {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  key: string; // YouTube video key
  name: string;
  site: string; // e.g., "YouTube"
  size: number; // e.g., 1080
  type: string; // e.g., "Trailer", "Teaser"
  official: boolean;
  published_at: string;
};
