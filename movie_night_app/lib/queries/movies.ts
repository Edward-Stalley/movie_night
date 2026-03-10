//  ## General Movies

import { RowDataPacket } from "mysql2";
import { pool } from "@/lib/db";
import { MovieRow } from "@/lib/types/db";

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
  const data = rows[0] as MovieRow;

  return rows[0] as MovieRow;
}
