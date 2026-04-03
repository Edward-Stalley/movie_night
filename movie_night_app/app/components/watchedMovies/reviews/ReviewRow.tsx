'use client';

import { LoggedInUser, Review, WatchedMovie } from '@/lib/types/domain';
import StarRating from '@/app/components/shared/StarRating';
import { useState } from 'react';
import { InvertedCommas } from '@/app/components/icons';
import { EditPen } from '@/app/components/icons';
import { useRouter } from 'next/navigation';
import { saveReview } from '@/lib/api/reviews';
import { ReviewInsert } from '@/lib/types/db';

type EditableReviewRowProps = {
  loggedInUser?: LoggedInUser;
  movie: WatchedMovie;
  review: Review;
};

export function ReviewRow({ loggedInUser, movie, review }: EditableReviewRowProps) {
  const [editing, setEditing] = useState(false);
  const isAuthor = review.ratedById === Number(loggedInUser?.id);
  const [rating, setRating] = useState<number | null>(review.rating ?? null);

  const isChooser = review.ratedById === movie.chosenById;
  const [reviewComment, setReviewComment] = useState(review.comment ?? '');

  const router = useRouter();

  const toggleEditMode = () => {
    setEditing((prevState) => !prevState);
  };

  const handleRatingClick = async (value: number) => {
    setRating(value);

    const reviewData: ReviewInsert = {
      watchedMovieId: movie.id,
      userId: Number(loggedInUser?.id),
      comment: reviewComment,
      rating: value,
    };

    await saveReview(movie.movieId, reviewData);

    router.refresh();
  };

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    if (!reviewComment.trim()) return;

    const reviewData: ReviewInsert = {
      watchedMovieId: movie.id,
      userId: Number(loggedInUser?.id), // rated by is same as logged in user
      comment: reviewComment,
      rating: review.rating,
    };

    await saveReview(movie.movieId, reviewData);

    // review.comment = reviewComment;
    setEditing(false);
    router.refresh();
  };

  const textArea = (
    <form
      className="p-2 rounded-2xl flex flex-col sm:flex-row gap-2 bg-neutral w-full"
      onSubmit={handleSubmit}
    >
      <textarea
        value={reviewComment}
        onChange={(e) => setReviewComment(e.target.value)}
        className="w-full p-2 bg-accent-content rounded-2xl text-base-content"
        placeholder="Write Review Here..."
      />

      <button className="btn btn-primary btn-soft sm:w-auto w-full">Submit</button>
    </form>
  );

  const displayComment = (
    <div className="wrap-break-word whitespace-pre-wrap"> {review.comment}</div>
  );

  const editToggleButton = (
    <div className=" flex justify-start items-center">
      <button className=" " onClick={toggleEditMode}>
        <EditPen className={'btn btn-primary btn-circle h-5 '} fill={''} />
      </button>
    </div>
  );

  return (
    <div
      key={`${review.ratedById}-${movie.id}`}
      className="bg-accent-content m-1 rounded-2xl p-3 flex flex-col sm:flex-row gap-3 border sm:border-none"
    >
      {/* LEFT SIDE (name + edit) */}
      <div className="flex sm:flex-col sm:min-w-27.5 gap-2 items-center sm:items-start">
        <div className={`${isChooser ? 'text-primary ' : 'text-secondary'} font-bold`}>
          {review.ratedByName}
        </div>
        {isAuthor && editToggleButton}
      </div>

      {/* RIGHT SIDE */}
      <div className="flex flex-col w-full">
        <StarRating
          rating={rating}
          onClick={editing ? handleRatingClick : undefined}
          isEditing={editing}
        />

        <div className="flex gap-2 pt-2 items-start">
          <InvertedCommas />

          <div className="w-full max-w-xl wrap-break-word">
            {isAuthor ? (editing ? textArea : displayComment) : displayComment}
          </div>
        </div>
      </div>
    </div>
  );
}
