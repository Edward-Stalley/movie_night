import { pool } from '@/lib/db';
import { ResultSetHeader, RowDataPacket } from 'mysql2';
import {
  VoteKey,
  VoteSessionFilter,
  MovieNightSessionWithMovieRow,
  MovieNightSessionRow,
  VoteRow,
  MoviesQuery,
  MovieRow,
} from '../types/db';
import { VoteSessionStatus } from '@/lib/types/domain';
import { PaginatedResult } from '@/lib/types/pagination';

type CreateVoteSessionQuery = {
  movieNightDate: string;
  movieIds: number[];
  createdBy: number;
};

export async function createVotingSession({
  movieNightDate,
  movieIds,
  createdBy,
}: CreateVoteSessionQuery) {
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    //   STEP 1) CREATE VOTE SESSION
    const [result] = await connection.query<ResultSetHeader>(
      `
        INSERT into vote_sessions (movie_night_date, created_by)
        VALUES (?,?)
        `,
      [movieNightDate, createdBy],
    );

    const voteSessionId = result.insertId;

    //   STEP 2) ADD MOVIES RELATED TO SESSION
    const values = movieIds.map((id) => [voteSessionId, id]);
    await connection.query<ResultSetHeader>(
      `
        INSERT into vote_session_movies (vote_session_id, movie_id)
        VALUES ?
        `,
      [values],
    );

    await connection.commit();
    return voteSessionId;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}

export async function getVoteSessionMovieRows(
  id: number,
): Promise<MovieNightSessionWithMovieRow[]> {
  const [rows] = await pool.query<RowDataPacket[]>(
    `
SELECT
  vs.id AS id,
  vs.movie_night_date AS movieNightDate,
  vs.created_by AS createdBy,
  vs.created_at AS createdAt,
  vs.status,
  m.id AS movieId,
  m.title,
  m.poster_path AS posterPath
FROM vote_sessions vs
JOIN vote_session_movies vsm
  ON vs.id = vsm.vote_session_id
JOIN movies m
  ON vsm.movie_id = m.id
WHERE vs.id = ?
    `,
    [id],
  );

  return rows as MovieNightSessionWithMovieRow[];
}

//  (GET) Get the Movie Night Sessions

export async function getSessionRows(): Promise<MovieNightSessionRow[]> {
  const [rows] = await pool.query<RowDataPacket[]>(
    `
SELECT
  id,
  movie_night_date AS movieNightDate,
  created_by AS createdBy,
  created_at AS createdAt,
  status
FROM
  vote_sessions
    `,
  );

  return rows as MovieNightSessionRow[];
}

export async function deleteVoteSession(sessionId: number): Promise<void> {
  await pool.query(`DELETE from vote_sessions WHERE id = ?`, [sessionId]);
}

// (UPDATE: voting status)
export async function closeVotingSession({
  voteSessionId,
}: VoteSessionFilter): Promise<VoteSessionStatus> {
  await pool.query<RowDataPacket[]>(
    `
    UPDATE vote_sessions 
    SET status = 'completed'
    WHERE id = ?
    `,
    [voteSessionId],
  );

  return 'completed';
}

// ## (POST) : Add Vote for Movie

export async function addVote(vote: VoteKey) {
  const [result] = await pool.query<ResultSetHeader>(
    `
    INSERT INTO votes( vote_session_id, user_id, movie_id )
    VALUES (?,?,?);
    `,
    [vote.voteSessionId, vote.userId, vote.movieId],
  );

  return {
    id: result.insertId,
  };
}

// ## (DELETE) : Remove Vote for Movie

export async function deleteVote(voteId: number): Promise<void> {
  await pool.query(`DELETE from votes WHERE id = ?`, [voteId]);
}

// ## (DETAIL)

export async function getVoteByUserMovieSession({ voteSessionId, userId, movieId }: VoteKey) {
  const [rows] = await pool.query<RowDataPacket[]>(
    `
    SELECT id
    FROM votes
    WHERE vote_session_id = ?
      AND user_id = ?
      AND movie_id = ?
    LIMIT 1;
    `,
    [voteSessionId, userId, movieId],
  );

  return rows[0] ?? null;
}

// ## (GET) Vote List

export async function getAllVotesForMovieSession({
  voteSessionId,
}: VoteSessionFilter): Promise<VoteRow[]> {
  const [rows] = await pool.query<RowDataPacket[]>(
    `
    SELECT id, vote_session_id, user_id, movie_id
    FROM votes
    WHERE vote_session_id = ?
    `,
    [voteSessionId],
  );
  return rows as VoteRow[];
}

// # GET 'UNWATCHED MOVIES' for vote
// ## Filter out any movies from 'watched_movies' as they will not be rewatched.

const MOVIE_SORT_MAP = {
  addedBy: 'm.added_by',
  releaseDate: 'm.release_date',
  title: 'm.title',
  addedOn: 'm.added_on',
};

type SortKey = keyof typeof MOVIE_SORT_MAP;

function isSortKey(value: string): value is SortKey {
  return value in MOVIE_SORT_MAP;
}

export async function getUnwatchedMovies({
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
LEFT JOIN watched_movies wm ON wm.movie_id = m.id
WHERE wm.movie_id is NULL
ORDER BY ${sortColumn} ${sortDirection}
LIMIT ?
OFFSET ?
    `,
    [limit, offset],
  );

  const [countRows] = await pool.query<RowDataPacket[]>(`
    SELECT COUNT(*) as total FROM movies m
    LEFT JOIN watched_movies wm ON wm.movie_id = m.id
    WHERE wm.movie_id IS NULL
  `);

  return {
    data: rows as MovieRow[],
    total: countRows[0].total,
  };
}
