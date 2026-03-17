// # Table: watched_movies

import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { WatchedMovieRow } from '@/lib/types/db';
import { pool } from '@/lib/db';
import { WatchedMovieInsert } from '@/lib/types/db';
import { UserId } from '../types/domain';
import { PaginatedResult } from '@/lib/types/pagination';

// ## (GET) : Get List of Movies from watched_movies.
export async function getWatchedMovies(
  limit: number,
  offset: number,
): Promise<PaginatedResult<WatchedMovieRow>> {
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
LIMIT ?
OFFSET ?
    `,
    [limit, offset],
  );

  const [countRows] = await pool.query<RowDataPacket[]>(`
    SELECT COUNT (*) as total FROM watched_movies`);

  const total = countRows[0].total;

  return { data: rows as WatchedMovieRow[], total };
}
// ## (DETAIL) SHOW: get individual movie from watched_movies.

export async function showWatchedMovie(id: number): Promise<WatchedMovieRow[] | null> {
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
LEFT JOIN users chooser
  ON wm.chosen_by = chooser.id
WHERE m.id = ?
    `,
    [id],
  );

  if (rows.length === 0) return null;

  return rows as WatchedMovieRow[];
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

//  ## (DELETE): Delete watched movie

export async function deleteWatchedMovie(id: number): Promise<void> {
  await pool.query('DELETE from watched_movies WHERE id = ?', [id]);
}

// ##  Update Watched Movie (chosen_by)

export async function updateChosenBy(watchedMovieId: number, userId: UserId) {
  await pool.query(
    `
    UPDATE watched_movies
    SET chosen_by = ?
    WHERE id = ?
    `,
    [userId, watchedMovieId],
  );
}

export async function updateWatchedOn(watchedMovieId: number, watchedOn: string) {
  await pool.query(
    `
    UPDATE watched_movies
    SET watched_on = ?
    WHERE id = ?
    `,
    [watchedOn, watchedMovieId],
  );
}
