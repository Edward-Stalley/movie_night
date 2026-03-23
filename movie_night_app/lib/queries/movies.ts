//  ## General Movies

import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { pool } from '@/lib/db';
import { MovieRow, MovieInsert } from '@/lib/types/db';
import { PaginatedResult } from '@/lib/types/pagination';
import { StoredMovie } from '../types/domain';

export async function getMovies(limit: number, offset: number): Promise<PaginatedResult<MovieRow>> {
  const [rows] = await pool.query<RowDataPacket[]>(
    `
SELECT
    m.id AS id,
    m.original_title AS originalTitle,
    m.genre_ids AS genreIds,
    m.overview,
    m.release_date AS releaseDate,
    m.poster_path AS posterPath,
    m.tmdb_id
FROM movies m 
LIMIT ?
OFFSET ?
    `,
    [limit, offset],
  );

  const [countRows] = await pool.query<RowDataPacket[]>(`
    SELECT COUNT(*) as total
    FROM movies
    `);

  const total = countRows[0].total;

  return { data: rows as MovieRow[], total };
}

// PARAMS NEEDED: releaseDate, alphabetical, genres

// ORDER BY ID DESC;
// LIMIT
// OFFSET

export async function deleteMovie(id: number): Promise<void> {
  await pool.query(`DELETE from movies WHERE id = ?`, [id]);
}

//  Detail (indiviudal Movie)

export async function getMovie(id: number): Promise<MovieRow | null> {
  const [rows] = await pool.query<RowDataPacket[]>(
    `
SELECT
    m.id AS id,
    m.original_title AS originalTitle,
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

// ## (POST) : Add individual Movie to watched_movies.

export async function addMovie(movie: MovieInsert): Promise<StoredMovie> {
  const [result] = await pool.query<ResultSetHeader>(
    `
    INSERT INTO movies ( original_title, tmdb_id, genre_ids, overview, release_date, poster_path, added_by, trailer_url)
    VALUES (?,?,?,?,?,?,?,?);
    `,
    [
      movie.originalTitle,
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
