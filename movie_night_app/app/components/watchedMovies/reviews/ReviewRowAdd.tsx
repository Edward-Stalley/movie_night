'use client';

import { LoggedInUser, WatchedMovie } from '@/lib/types/domain';
import { ReviewInsert } from '@/lib/types/db';
import StarRating from '@/app/components/shared/StarRating';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { saveReview } from '@/lib/api/reviews';

type AddReviewRowProps = {
  loggedInUser?: LoggedInUser;
  movie: WatchedMovie;
};

export function ReviewRowAdd({ loggedInUser, movie }: AddReviewRowProps) {
  const [reviewComment, setReviewComment] = useState<string>('');
  const [rating, setRating] = useState<number | null>(null);
  const router = useRouter();

  const handleRatingClick = async (value: number) => {
    setRating(value);

    const reviewData: ReviewInsert = {
      watchedMovieId: movie.id,
      userId: Number(loggedInUser?.id),
      comment: reviewComment,
      rating: value,
    };

    await saveReview(movie.movieId, reviewData);
  };

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    if (!reviewComment.trim()) return;

    const reviewData: ReviewInsert = {
      watchedMovieId: movie.id,
      userId: Number(loggedInUser?.id), // rated by is same as logged in user
      comment: reviewComment,
      rating: rating,
    };

    await saveReview(movie.movieId, reviewData);

    router.refresh();
  };

  const textArea = (
    <form
      className="p-2 rounded-2xl flex flex-col sm:flex-row gap-2 bg-base-200 w-full"
      onSubmit={handleSubmit}
    >
      <textarea
        value={reviewComment}
        onChange={(e) => setReviewComment(e.target.value)}
        className="w-full p-2 bg-base-300 rounded-2xl text-base-content"
        placeholder="Write Review Here..."
      />
      <div className="flex justify-end">
        <button className="btn btn-primary sm:w-auto w-fit rounded-2xl">Submit</button>
      </div>
    </form>
  );

  return (
    <div className="bg-accent-content m-1 mt-2 rounded-2xl p-3 flex flex-col sm:flex-row gap-3 border ">
      {/* LEFT */}
      <div className="sm:min-w-27.5">
        <div>{loggedInUser?.name}</div>
        <StarRating rating={rating} onClick={(e) => handleRatingClick(e)} isEditing={true} />
      </div>

      {/* RIGHT */}
      <div className="flex gap-2 items-start w-full">
        <div className="w-full max-w-xl">{textArea}</div>
      </div>
    </div>
  );
}
