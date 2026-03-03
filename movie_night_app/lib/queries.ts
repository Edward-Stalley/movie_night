//  # QUERIES FOR MYSQL DATABASE (movie_night)
import { pool } from "@/lib/db";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { MovieRow } from "@/lib/types/db";
import { MovieInsert, StoredMovie } from "./types/domain";
import { TMDBMovie } from "./types/tmdb";

// # Table: watched_movies

// ## (GET) : Get List of Movies from watched_movies.
export async function getWatchedMoviesRaw(): Promise<MovieRow[]> {
  const [rows] = await pool.query<RowDataPacket[]>(`
SELECT
    wm.id,
    wm.movie_id AS movieId,
    wm.watched_on AS watchedOn,
    mr.rating,
    mr.comment,
    m.original_title AS originalTitle,
    m.genre_ids AS genreIds,
    m.overview,
    m.release_date AS releaseDate,
    m.poster_path AS posterPath,
    chooser.user_name AS chosenBy,
    rater.user_name AS ratedBy
FROM watched_movies wm
JOIN movies m
  ON wm.movie_id = m.id
LEFT JOIN movie_ratings mr
  ON wm.movie_id = mr.watched_movie_id
LEFT JOIN users rater
  ON mr.user_id = rater.id
JOIN users chooser
  ON wm.chosen_by = chooser.id
    `);

  return rows as MovieRow[];
}

// ## (POST) : Add individual Movie to watched_movies.

export async function addMovie(movie: MovieInsert): Promise<StoredMovie> {
  const [result] = await pool.query<ResultSetHeader>(
    `
    INSERT INTO movies ( original_title, tmdb_id, genre_ids, overview, release_date, poster_path)
    VALUES (?,?,?,?,?,?);
    `,
    [
      movie.originalTitle,
      movie.tmdbId,
      JSON.stringify(movie.genreIds),
      movie.overview,
      movie.releaseDate ? new Date(movie.releaseDate) : null,
      movie.posterPath,
    ],
  );

  return {
    id: result.insertId,
    ...movie,
  };
}

//  General Movies

export async function getMoviesListRaw(): Promise<MovieRow[]> {
  const [rows] = await pool.query<RowDataPacket[]>(`
SELECT
    m.id AS id,
    m.original_title AS originalTitle,
    m.genre_ids AS genreIds,
    m.overview,
    m.release_date AS releaseDate,
    m.poster_path AS posterPath
FROM movies m
    `);

  return rows as MovieRow[];
}
