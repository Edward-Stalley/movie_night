// # Table: watched_movies

import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { MovieRow } from '@/lib/types/db';
import { pool } from '../db';
import { WatchedMovieInsert } from '../types/domain';

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
    m.tmdb_id AS tmdbId,
    chooser.name AS chosenBy,
    rater.name AS ratedBy
FROM watched_movies wm
JOIN movies m
  ON wm.movie_id = m.id
LEFT JOIN movie_ratings mr
  ON wm.movie_id = mr.watched_movie_id
LEFT JOIN users rater
  ON mr.user_id = rater.id
LEFT JOIN users chooser
  ON wm.chosen_by = chooser.id
    `);

  return rows as MovieRow[];
}

// ## (DETAIL) SHOW: get individual movie from watched_movies.

export async function showWatchedMovie(id: number): Promise<MovieRow[] | null> {
  const [rows] = await pool.query<RowDataPacket[]>(
    `
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
    chooser.name AS chosenBy,
    rater.name AS ratedBy
FROM watched_movies wm
JOIN movies m
  ON wm.movie_id = m.id
LEFT JOIN movie_ratings mr
  ON wm.movie_id = mr.watched_movie_id
LEFT JOIN users rater
  ON mr.user_id = rater.id
JOIN users chooser
  ON wm.chosen_by = chooser.id
WHERE m.id = ?
    `,
    [id],
  );

  if (rows.length === 0) return null;

  return rows as MovieRow[];
}

// ## (POST) : Add individual Movie to watched_movies.

export async function addWatchedMovie(
  movie: WatchedMovieInsert,
): Promise<WatchedMovieInsert & { id: number }> {
  const [result] = await pool.query<ResultSetHeader>(
    `
    INSERT INTO watched_movies ( movie_id )
    VALUES (?);
    `,
    [movie.movieId],
  );

  return {
    ...movie,
    id: result.insertId,
  };
}
