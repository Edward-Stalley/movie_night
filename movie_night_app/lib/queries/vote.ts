import { pool } from '@/lib/db';
import { unstable_cache } from 'next/cache';
import { revalidateTag } from 'next/cache';

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

// --------------------------
// VOTE SESSION / MOVIE QUERIES
// --------------------------

export const _getVoteSessionMovieRows = async (
  id: number,
): Promise<MovieNightSessionWithMovieRow[]> => {
  const res = await pool.query(
    `
SELECT
  vs.id AS id,
  vs.movie_night_date AS "movieNightDate",
  vs.created_by AS "createdBy",
  vs.created_at AS "createdAt",
  vs.status,
  m.id AS "movieId",
  m.title,
  m.poster_path AS "posterPath"
FROM vote_sessions vs
JOIN vote_session_movies vsm
  ON vs.id = vsm.vote_session_id
JOIN movies m
  ON vsm.movie_id = m.id
WHERE vs.id = $1
    `,
    [id],
  );

  return res.rows as MovieNightSessionWithMovieRow[];
};

export const getVoteSessionMovieRows = unstable_cache(
  _getVoteSessionMovieRows,
  ['vote-session-movies'],
  {
    revalidate: 3600,
    tags: ['vote-session-movies'],
  },
);

export const _getSessionRows = async (): Promise<MovieNightSessionRow[]> => {
  const res = await pool.query(
    `
SELECT
  id,
  movie_night_date AS "movieNightDate",
  created_by AS "createdBy",
  created_at AS "createdAt",
  status
FROM vote_sessions
    `,
  );

  return res.rows as MovieNightSessionRow[];
};

export const getSessionRows = unstable_cache(_getSessionRows, ['vote-sessions'], {
  revalidate: 3600,
  tags: ['vote-sessions'],
});

export async function deleteVoteSession(sessionId: number): Promise<void> {
  await pool.query(`DELETE FROM vote_sessions WHERE id = $1`, [sessionId]);
  revalidateTag('vote-sessions', 'max');
}

export async function closeVotingSession({
  voteSessionId,
}: VoteSessionFilter): Promise<VoteSessionStatus> {
  await pool.query(
    `
    UPDATE vote_sessions 
    SET status = 'completed'
    WHERE id = $1
    `,
    [voteSessionId],
  );

  revalidateTag('vote-sessions', 'max');
  return 'completed';
}

export async function addVote(vote: VoteKey) {
  const res = await pool.query<{ id: number }>(
    `
    INSERT INTO votes(vote_session_id, user_id, movie_id)
    VALUES ($1, $2, $3)
    RETURNING id
    `,
    [vote.voteSessionId, vote.userId, vote.movieId],
  );

  revalidateTag(`vote-session-votes-${vote.voteSessionId}`, 'max');

  return { id: res.rows[0].id };
}

export async function deleteVote(voteId: number, voteSessionId: number): Promise<void> {
  await pool.query(`DELETE FROM votes WHERE id = $1`, [voteId]);

  revalidateTag(`vote-session-votes-${voteSessionId}`, 'max');
}

export async function getVoteByUserMovieSession({ voteSessionId, userId, movieId }: VoteKey) {
  const res = await pool.query(
    `
    SELECT id
    FROM votes
    WHERE vote_session_id = $1
      AND user_id = $2
      AND movie_id = $3
    LIMIT 1
    `,
    [voteSessionId, userId, movieId],
  );

  return res.rows[0] ?? null;
}

export const _getAllVotesForMovieSession = async ({
  voteSessionId,
}: VoteSessionFilter): Promise<VoteRow[]> => {
  const res = await pool.query(
    `
    SELECT id, vote_session_id, user_id, movie_id
    FROM votes
    WHERE vote_session_id = $1
    `,
    [voteSessionId],
  );

  return res.rows as VoteRow[];
};

export const getAllVotesForMovieSession = ({ voteSessionId }: { voteSessionId: number }) =>
  unstable_cache(
    () => _getAllVotesForMovieSession({ voteSessionId }),
    [`vote-session-votes-${voteSessionId}`],
  )();

// --------------------------
// UNWATCHED MOVIES
// --------------------------

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

export const _getUnwatchedMovies = async ({
  limit,
  offset,
  sortBy,
  order,
}: MoviesQuery): Promise<PaginatedResult<MovieRow>> => {
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
        m.tmdb_id
    FROM movies m
    LEFT JOIN watched_movies wm ON wm.movie_id = m.id
    WHERE wm.movie_id IS NULL
    ORDER BY ${sortColumn} ${sortDirection}
    LIMIT $1
    OFFSET $2
    `,
    [limit, offset],
  );

  const countRes = await pool.query<{ total: number }>(
    `
    SELECT COUNT(*) as total
    FROM movies m
    LEFT JOIN watched_movies wm ON wm.movie_id = m.id
    WHERE wm.movie_id IS NULL
    `,
  );

  return {
    data: res.rows as MovieRow[],
    total: countRes.rows[0].total,
  };
};

export const getUnwatchedMovies = unstable_cache(_getUnwatchedMovies, ['unwatched-movies'], {
  revalidate: 3600,
  tags: ['unwatched-movies'],
});

// --------------------------
// GET MOVIES BY IDs
// --------------------------

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

  return res.rows as MovieRow[];
};

export const getSelectedMoviesByIds = (ids: number[]) =>
  unstable_cache(() => _getSelectedMoviesByIds(ids), [`selected-movies-${ids.join('-')}`]);

// --------------------------
// CREATE VOTING SESSION
// --------------------------

export async function createVotingSession({
  movieNightDate,
  movieIds,
  createdBy,
}: CreateVoteSessionQuery) {
  const connection = await pool.connect();

  try {
    await connection.query('BEGIN');

    // STEP 1: CREATE VOTE SESSION
    const voteRes = await connection.query<{ id: number }>(
      `
      INSERT INTO vote_sessions (movie_night_date, created_by)
      VALUES ($1, $2)
      RETURNING id
      `,
      [movieNightDate, createdBy],
    );

    const voteSessionId = voteRes.rows[0].id;

    // STEP 2: ADD MOVIES
    if (movieIds.length > 0) {
      await connection.query(
        `
        INSERT INTO vote_session_movies (vote_session_id, movie_id)
        SELECT $1, unnest($2::int[])
        `,
        [voteSessionId, movieIds],
      );
    }

    await connection.query('COMMIT');
    revalidateTag('vote-sessions', 'max');

    return voteSessionId;
  } catch (error) {
    await connection.query('ROLLBACK');
    throw error;
  } finally {
    connection.release();
  }
}
