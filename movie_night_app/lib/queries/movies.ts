//  ## General Movies

import { pool } from '@/lib/db';
import { MovieRow, MovieInsert, MoviesQuery } from '@/lib/types/db';
import { PaginatedResult } from '@/lib/types/pagination';
import { StoredMovie } from '@/lib/types/domain';
import { MOVIE_SORT_MAP } from '@/lib/config/sorts';
import { isSortKey } from '@/lib/utils/sort/isSortKey';
import { cacheLife, cacheTag, revalidateTag } from 'next/cache';
import { unstable_cache } from 'next/cache';

const _getMovies = async ({
  limit,
  offset,
  sortBy,
  order,
}: MoviesQuery): Promise<PaginatedResult<MovieRow>> => {
  console.log('DB HIT: getMovies', limit, offset, sortBy, order);

  const sortColumn = isSortKey(sortBy) ? MOVIE_SORT_MAP[sortBy] : MOVIE_SORT_MAP.title;

  const sortDirection = order === 'asc' ? 'ASC' : 'DESC';

  const res = await pool.query(
    `
SELECT
    m.id AS id,
    m.title,
    m.genre_ids AS "genreIds",
    m.overview,
    m.release_date AS "releaseDate",
    m.poster_path AS "posterPath",
    m.tmdb_id AS "tmdbId",
    m.trailer_url AS "trailerUrl"
FROM movies m
LEFT JOIN watched_movies wm ON wm.movie_id = m.id
WHERE wm.movie_id is NULL
ORDER BY ${sortColumn} ${sortDirection}
LIMIT $1
OFFSET $2
    `,
    [limit, offset],
  );

  const countRes = await pool.query<{ total: number }>(`
    SELECT COUNT(*) as total 
    FROM movies m
    LEFT JOIN watched_movies wm ON wm.movie_id = m.id
    WHERE wm.movie_id is NULL
  `);

  return {
    data: res.rows as MovieRow[],
    total: countRes.rows[0].total,
  };
};

export const getMovies = unstable_cache(_getMovies, ['movies'], {
  revalidate: 3600,
  tags: ['movies'],
});

export const deleteMovie = async (id: number): Promise<void> => {
  await pool.query(`DELETE from movies WHERE id = $1`, [id]);
  revalidateTag('movies', 'max');
};

//  Detail (indiviudal Movie)
const _getMovie = async (id: number): Promise<MovieRow | null> => {
  const res = await pool.query(
    `
    SELECT
    m.id AS id,
    m.title,
    m.genre_ids AS "genreIds",
    m.overview,
    m.release_date AS "releaseDate",
    m.poster_path AS "posterPath",
    m.trailer_url AS "trailerUrl",
    m.tmdb_id AS "tmdbId"
    FROM movies m
    WHERE m.id = $1
    `,
    [id],
  );

  return res.rows[0] as MovieRow;
};

export const getMovie = (id: number) =>
  unstable_cache(() => _getMovie(id), [`movies-${id}`], {
    revalidate: 3600,
    tags: [`movies`],
  })();

export const _getSelectedMoviesByIds = async (ids: number[]): Promise<MovieRow[]> => {
  if (ids.length === 0) return [];

  const placeholders = ids.map((_, i) => `$${i + 1}`).join(',');

  const res = await pool.query(
    `
SELECT
    m.id AS id,
    m.title,
    m.genre_ids AS "genreIds",
    m.overview,
    m.release_date AS "releaseDate",
    m.poster_path AS "posterPath",
    m.tmdb_id
FROM movies m
WHERE m.id IN (${placeholders})
    `,
    ids,
  );

  // cacheTag(`movies-${ids}`);

  return res.rows as MovieRow[];
};

export const getSelectedMoviesByIds = (ids: number[]) =>
  unstable_cache(() => _getSelectedMoviesByIds(ids), [`selected-movies-${ids.join('-')}`], {
    revalidate: 3600,
    tags: ['movies'],
  })();

// ## (POST) : Add individual Movie to watched_movies.

export const addMovie = async (movie: MovieInsert): Promise<StoredMovie> => {
  const res = await pool.query<{ id: number }>(
    `
    INSERT INTO movies ( title, tmdb_id, genre_ids, overview, release_date, poster_path, added_by, trailer_url)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING id
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

  revalidateTag('movies', 'max');

  return {
    id: res.rows[0].id,
    ...movie,
  };
};
