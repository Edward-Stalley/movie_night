import { pool } from '@/lib/db';
import { ResultSetHeader } from 'mysql2';
import { ReviewInsert } from '@/lib/types/domain';

//  ## POST / UPDATE review in movie_ratings table.

export async function upsertReview(review: ReviewInsert) {
  const [result] = await pool.query<ResultSetHeader>(
    `
  INSERT INTO movie_ratings (watched_movie_id,user_id, rating, comment)
    VALUES(?,?,?,?) ON DUPLICATE KEY UPDATE rating = VALUES(rating), comment = VALUES(comment)
    
    `,
    [review.watchedMovieId, review.userId, review.rating, review.comment],
  );

  return result;
}
