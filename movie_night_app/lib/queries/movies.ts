//  ## General Movies

import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { pool } from '@/lib/db';
import { MovieRow, MovieInsert } from '@/lib/types/db';
import { StoredMovie } from '../types/domain';

export async function getMovies(): Promise<MovieRow[]> {
  const [rows] = await pool.query<RowDataPacket[]>(`
SELECT
    m.id AS id,
    m.original_title AS originalTitle,
    m.genre_ids AS genreIds,
    m.overview,
    m.release_date AS releaseDate,
    m.poster_path AS posterPath,
    m.tmdb_id
FROM movies m
    `);

  return rows as MovieRow[];
}

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
