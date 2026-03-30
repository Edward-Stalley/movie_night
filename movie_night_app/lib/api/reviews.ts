// lib/api/reviews.ts

import { ReviewInsert } from '@/lib/types/db';

export async function saveReview(watchedMovieId: number, review: ReviewInsert) {
  await fetch(`/api/movies/watched/${watchedMovieId}/reviews`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(review),
  });
}
