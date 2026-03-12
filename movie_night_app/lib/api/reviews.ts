// lib/api/reviews.ts

import { ReviewInsert } from '@/lib/types/domain';

export async function saveReview(movieId: number, review: ReviewInsert) {
  await fetch(`/api/movies/watched/${movieId}/reviews`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(review),
  });
}
