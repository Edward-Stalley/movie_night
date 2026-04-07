'use cache';
import { pool } from '@/lib/db';
import { ReviewInsert } from '@/lib/types/db';
import { revalidateTag } from 'next/cache';

//  ## POST / UPDATE review in movie_ratings table.

export async function upsertReview(review: ReviewInsert) {
  const res = await pool.query(
    `
  INSERT INTO movie_ratings (watched_movie_id, user_id, rating, comment)
  VALUES ($1, $2, $3, $4)
  ON CONFLICT (watched_movie_id, user_id)
  DO UPDATE SET
    rating = EXCLUDED.rating,
    comment = EXCLUDED.comment
    `,
    [review.watchedMovieId, review.userId, review.rating, review.comment],
  );

  revalidateTag('watched-movies', 'max');
  revalidateTag('movies', 'max');
  revalidateTag(`watched-movies-${review.watchedMovieId}`, 'max');

  return res.rows;
}
