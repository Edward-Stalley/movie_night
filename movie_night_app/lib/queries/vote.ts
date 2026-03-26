import { pool } from '@/lib/db';
import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { VoteSessionMovieRow } from '../types/db';

type CreateVoteQuery = {
  movieNightDate: string;
  movieIds: number[];
  createdBy: number;
};

export async function createVoteSession({ movieNightDate, movieIds, createdBy }: CreateVoteQuery) {
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

export async function getVoteSessionRows(id: number): Promise<VoteSessionMovieRow[]> {
  const [rows] = await pool.query<RowDataPacket[]>(
    `
SELECT
  vs.id AS id,
  vs.movie_night_date AS movieNightDate,
  vs.created_by AS createdBy,
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
