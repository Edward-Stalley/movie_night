import { StoredMovie } from "../types/domain";

export async function addMovieToWatched(movie: StoredMovie) {
  console.log("Need to implement");
  await fetch(`/api/movies/watched`, {
    method: "POST",
    body: JSON.stringify(movie),
  });
}
