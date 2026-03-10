//  # QUERIES FOR MYSQL DATABASE (movie_night)
import { pool } from "@/lib/db";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { DBUser, DBUserRow, MovieRow } from "@/lib/types/db";
import {
  MovieInsert,
  Review,
  ReviewInsert,
  StoredMovie,
  UserId,
} from "./types/domain";

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
JOIN users chooser
  ON wm.chosen_by = chooser.id
    `);

  return rows as MovieRow[];
}

// ## (DETAIL) Show individual movie from watched_movies.

export async function getWatchedMovie(id: number): Promise<MovieRow[] | null> {
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

//  ## POST / UPDATE review in movie_ratings table.

export async function upsertReview(review: ReviewInsert) {
  console.log("in upsert review", review);
  const [result] = await pool.query<ResultSetHeader>(
    `
  INSERT INTO movie_ratings (watched_movie_id,user_id, rating, comment)
    VALUES(?,?,?,?) ON DUPLICATE KEY UPDATE rating = VALUES(rating), comment = VALUES(comment)
    
    `,
    [review.watchedMovieId, review.userId, review.rating, review.comment],
  );

  return result;
}

//  ## General Movies

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

// USERS

// # CREATE USER
// # IF USER DOES NOT EXIST IN DB → CREATE USER
export async function upsertUser(user: DBUser) {
  await pool.query<ResultSetHeader>(
    `INSERT INTO users(name, image, provider, provider_account_id) VALUES(?,?,?,?) ON DUPLICATE KEY UPDATE name = VALUES(name)`,
    [user.name, user.image, user.provider, user.providerAccountId],
  );
}

// # GET USER by "provider_account_id"
export async function getUserByProviderAccountId(
  providerAccountId: string,
): Promise<DBUserRow | null> {
  const [rows] = await pool.query<RowDataPacket[]>(
    `
  SELECT id, name, image
  FROM users
  WHERE provider_account_id = ?`,
    [providerAccountId],
  );

  if ((rows as DBUserRow[]).length === 0) return null;
  console.log("rows as DBUserRow[])[0]", (rows as DBUserRow[])[0]);
  return (rows as DBUserRow[])[0];
}
