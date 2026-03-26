import { pool } from '@/lib/db';
import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { VoteInsert, VoteSessionMovieRow, VoteSessionRow } from '../types/db';

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

export async function getVoteSessionMovieRows(id: number): Promise<VoteSessionMovieRow[]> {
  const [rows] = await pool.query<RowDataPacket[]>(
    `
SELECT
  vs.id AS id,
  vs.movie_night_date AS movieNightDate,
  vs.created_by AS createdBy,
  vs.created_at AS createdAt,
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

  return rows as VoteSessionMovieRow[];
}

//  (GET) Get the Movie Night Sessions

export async function getSessionRows(): Promise<VoteSessionRow[]> {
  const [rows] = await pool.query<RowDataPacket[]>(
    `
SELECT
  id,
  movie_night_date AS movieNightDate,
  created_by AS createdBy,
  created_at AS createdAt
FROM
  vote_sessions
    `,
  );

  return rows as VoteSessionRow[];
}

// ## (POST) : Add Vote for Movie

export async function addVote(vote: VoteInsert) {
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

export async function getVoteByUserMovieSession({ voteSessionId, userId, movieId }: VoteInsert) {
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
