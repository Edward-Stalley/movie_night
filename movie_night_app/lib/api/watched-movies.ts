import { WatchedMovieInsert } from "../types/domain";

export async function addMovieToWatched(movie: WatchedMovieInsert) {
  await fetch(`/api/movies/watched`, {
    method: "POST",
    body: JSON.stringify(movie),
  });
}