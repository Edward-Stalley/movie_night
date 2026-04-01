// watched_movies.ts (Postgres version)

import { pool } from '@/lib/db';
import { WatchedMoviesQuery, WatchedMovieRow, WatchedMovieInsert } from '@/lib/types/db';
import { UserId } from '../types/domain';
import { PaginatedResult } from '@/lib/types/pagination';

const SORT_MAP = {
  watchedOn: 'wm.watched_on',
  releaseDate: 'm.release_date',
  title: 'm.title',
  chosenBy: 'wm.chosen_by',
} as const;

type SortKey = keyof typeof SORT_MAP;

const ORDER_MAP = {
  asc: 'ASC',
  desc: 'DESC',
} as const;

// ## (GET) : Get list of watched movies with pagination
export async function getWatchedMovies({
  limit,
  offset,
  sortBy,
  order,
}: WatchedMoviesQuery): Promise<PaginatedResult<WatchedMovieRow>> {
  const sortColumn = SORT_MAP[sortBy as SortKey] ?? SORT_MAP.watchedOn;
  const sortDirection = ORDER_MAP[order as keyof typeof ORDER_MAP] ?? ORDER_MAP.desc;

  const res = await pool.query(
    `
SELECT
    wm.id,
    wm.movie_id AS "movieId",
    wm.watched_on AS "watchedOn",
    mr.rating,
    mr.comment,
    m.title,
    m.genre_ids AS "genreIds",
    m.overview,
    m.release_date AS "releaseDate",
    m.poster_path AS "posterPath",
    m.tmdb_id AS "tmdbId",
    chooser.id AS "chosenById",
    chooser.name AS "chosenByName",
    chooser.image AS "chosenByImage",
    rater.id AS "ratedById",
    rater.name AS "ratedByName",
    rater.image AS "ratedByImage"
FROM watched_movies wm
JOIN movies m ON wm.movie_id = m.id
LEFT JOIN movie_ratings mr ON wm.id = mr.watched_movie_id
LEFT JOIN users rater ON mr.user_id = rater.id
LEFT JOIN users chooser ON wm.chosen_by = chooser.id
ORDER BY ${sortColumn} ${sortDirection}
LIMIT $1 OFFSET $2
    `,
    [limit, offset],
  );

  const rows = res.rows as WatchedMovieRow[];

  const countRes = await pool.query('SELECT COUNT(*) AS total FROM watched_movies');
  const total = parseInt(countRes.rows[0].total, 10);

  return { data: rows, total };
}

// ## (DETAIL) SHOW: get individual watched movie
export async function showWatchedMovie(id: number): Promise<WatchedMovieRow[] | null> {
  const res = await pool.query(
    `
SELECT
    wm.id,
    wm.movie_id AS "movieId",
    wm.watched_on AS "watchedOn",
    mr.rating,
    mr.comment,
    m.title,
    m.genre_ids AS "genreIds",
    m.overview,
    m.release_date AS "releaseDate",
    m.poster_path AS "posterPath",
    chooser.id AS "chosenById",
    chooser.name AS "chosenByName",
    chooser.image AS "chosenByImage",
    rater.id AS "ratedById",
    rater.name AS "ratedByName",
    rater.image AS "ratedByImage"
FROM watched_movies wm
JOIN movies m ON wm.movie_id = m.id
LEFT JOIN movie_ratings mr ON wm.id = mr.watched_movie_id
LEFT JOIN users rater ON mr.user_id = rater.id
LEFT JOIN users chooser ON wm.chosen_by = chooser.id
WHERE m.id = $1
    `,
    [id],
  );

  if (res.rows.length === 0) return null;
  return res.rows as WatchedMovieRow[];
}

// ## (POST) : Add individual watched movie
export async function addWatchedMovie(
  movie: WatchedMovieInsert,
): Promise<WatchedMovieInsert & { id: number }> {
  const res = await pool.query(
    `
INSERT INTO watched_movies (movie_id, watched_on, chosen_by)
VALUES ($1, $2, $3)
RETURNING id
    `,
    [movie.movieId, movie.watchedOn, movie.chosenBy],
  );

  return { ...movie, id: res.rows[0].id };
}

// ## (DELETE) : Delete watched movie
export async function deleteWatchedMovie(id: number): Promise<void> {
  await pool.query('DELETE FROM watched_movies WHERE id = $1', [id]);
}

// ## (UPDATE) : Update chosen_by
export async function updateChosenBy(watchedMovieId: number, userId: UserId) {
  await pool.query(
    `
UPDATE watched_movies
SET chosen_by = $1
WHERE id = $2
    `,
    [userId, watchedMovieId],
  );
}

// ## (UPDATE) : Update watched_on
export async function updateWatchedOn(watchedMovieId: number, watchedOn: string) {
  await pool.query(
    `
UPDATE watched_movies
SET watched_on = $1
WHERE id = $2
    `,
    [watchedOn, watchedMovieId],
  );
}