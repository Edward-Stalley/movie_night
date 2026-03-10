// lib/api/movies.ts

import { MovieInsert, StoredMovie } from "../types/domain";

export async function deleteMovieFromMovies(movie: StoredMovie) {
  await fetch(`/api/movies/${movie.id}`, {
    method: "DELETE",
    body: JSON.stringify(movie),
  });
}

export async function addMovieToMovies(movie: MovieInsert) {
  await fetch("/api/movies", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(movie),
  });
}
