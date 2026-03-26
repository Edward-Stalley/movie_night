//  ## General Movies

import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { pool } from '@/lib/db';
import { MovieRow, MovieInsert, MoviesQuery } from '@/lib/types/db';
import { PaginatedResult } from '@/lib/types/pagination';
import { StoredMovie } from '../types/domain';

const MOVIE_SORT_MAP = {
  addedBy: 'm.added_by',
  releaseDate: 'm.release_date',
  title: 'm.title',
  addedOn: 'm.added_on',
};

type SortKey = keyof typeof MOVIE_SORT_MAP;

const ORDER_MAP = {
  asc: 'ASC',
  desc: 'DESC',
};

function isSortKey(value: string): value is SortKey {
  return value in MOVIE_SORT_MAP;
}

export async function getMovies({
  limit,
  offset,
  sortBy,
  order,
}: MoviesQuery): Promise<PaginatedResult<MovieRow>> {
  const sortColumn = isSortKey(sortBy) ? MOVIE_SORT_MAP[sortBy] : MOVIE_SORT_MAP.title;

  const sortDirection = order === 'asc' ? 'ASC' : 'DESC';

  const [rows] = await pool.query<RowDataPacket[]>(
    `
SELECT
    m.id AS id,
    m.title,
    m.genre_ids AS genreIds,
    m.overview,
    m.release_date AS releaseDate,
    m.poster_path AS posterPath,
    m.tmdb_id
FROM movies m
ORDER BY ${sortColumn} ${sortDirection}
LIMIT ?
OFFSET ?
    `,
    [limit, offset],
  );

  const [countRows] = await pool.query<RowDataPacket[]>(`
    SELECT COUNT(*) as total FROM movies
  `);

  return {
    data: rows as MovieRow[],
    total: countRows[0].total,
  };
}

//  Detail (indiviudal Movie)

export async function deleteMovie(id: number): Promise<void> {
  await pool.query(`DELETE from movies WHERE id = ?`, [id]);
}

export async function getMovie(id: number): Promise<MovieRow | null> {
  const [rows] = await pool.query<RowDataPacket[]>(
    `
SELECT
    m.id AS id,
    m.title,
    m.genre_ids AS genreIds,
    m.overview,
    m.release_date AS releaseDate,
    m.poster_path AS posterPath,
    m.tmdb_id
FROM movies m
WHERE m.id = ?
    `,
    [id],
  );

  return rows[0] as MovieRow;
}

export async function getSelectedMoviesByIds(ids: number[]): Promise<MovieRow[]> {
  if (ids.length === 0) return [];

  const placeholders = ids.map(() => '?').join(',');

  const [rows] = await pool.query<RowDataPacket[]>(
    `
SELECT
    m.id AS id,
    m.title,
    m.genre_ids AS genreIds,
    m.overview,
    m.release_date AS releaseDate,
    m.poster_path AS posterPath,
    m.tmdb_id
FROM movies m
WHERE m.id IN (${placeholders})
    `,
    ids,
  );

  return rows as MovieRow[];
}

// ## (POST) : Add individual Movie to watched_movies.

export async function addMovie(movie: MovieInsert): Promise<StoredMovie> {
  const [result] = await pool.query<ResultSetHeader>(
    `
    INSERT INTO movies ( title, tmdb_id, genre_ids, overview, release_date, poster_path, added_by, trailer_url)
    VALUES (?,?,?,?,?,?,?,?);
    `,
    [
      movie.title,
      movie.tmdbId,
      JSON.stringify(movie.genreIds),
      movie.overview,
      movie.releaseDate ? new Date(movie.releaseDate) : null,
      movie.posterPath,
      movie.addedBy,
      movie.trailerUrl,
    ],
  );

  return {
    id: result.insertId,
    ...movie,
  };
}
