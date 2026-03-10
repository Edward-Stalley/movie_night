"use client";

import {
  LoggedInUser,
  Review,
  ReviewInsert,
  WatchedMovie,
} from "@/lib/types/domain";
import StarRating from "@/app/components/StarRating";
import { useState } from "react";
import InvertedCommas from "@/app/components/icons/InvertedCommas";
import EditPen from "@/app/components/icons/editPen";

type EditableReviewRowProps = {
  loggedInUser?: LoggedInUser;
  movie: WatchedMovie;
  review: Review;
};

export default function ReviewRow({
  loggedInUser,
  movie,
  review,
}: EditableReviewRowProps) {
  const [editing, setEditing] = useState(false);
  const isAuthor = review.ratedBy === loggedInUser?.name;
  const isChooser = review.ratedBy === movie.chosenBy;
  const [reviewComment, setReviewComment] = useState(review.comment ?? "");

  console.log("isAuthor, isChooser", isAuthor, isChooser);

  const existingReview = movie.reviews.some(
    (r) => r.ratedBy === loggedInUser?.name,
  );

  console.log("existingReview", existingReview);

  const toggleEditMode = () => {
    setEditing((prevState) => !prevState);
  };

  console.log("LoggedInUser", loggedInUser);
  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    if (!reviewComment.trim()) return;

    const reviewData: ReviewInsert = {
      watchedMovieId: movie.movieId,
      userId: Number(loggedInUser?.id), // rated by is same as logged in user
      comment: reviewComment,
      rating: review.rating,
    };

    await fetch(`/api/movies/watched/${movie.movieId}/reviews`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reviewData),
    });

    review.comment = reviewComment;
    setEditing(false);
  };

  const textArea = (
    <form
      className="p-2 ml-2 rounded-2xl flex justify-between items-center bg-neutral"
      onSubmit={handleSubmit}
    >
      <textarea
        value={reviewComment}
        onChange={(e) => setReviewComment(e.target.value)}
        className="flex-1 p-2 m-2 bg-accent-content rounded-2xl text-base-content"
        placeholder="Write Review Here..."
      />

      <button className="btn btn-primary btn-soft">Submit</button>
    </form>
  );

  const displayComment = <div className="pl-2"> {review.comment}</div>;

  const editToggleButton = (
    <div className="flex justify-center items-center">
      <button className=" " onClick={toggleEditMode}>
        <EditPen className={"btn btn-primary btn-circle "} fill={""} />
      </button>
    </div>
  );

  return (
    <div
      key={`${review.ratedBy}-${movie.id}`}
      className=" flex gap-4 bg-accent-content m-1 rounded-2xl p-2"
    >
      <div className={`${isChooser ? "text-accent font-bold" : ""} w-25`}>
        {review.ratedBy}
      </div>
      <div className="flex-col">
        <StarRating rating={review.rating} />
        <div className="flex pl-2 pt-2">
          <InvertedCommas />
          <div className="w-96">
            {isAuthor ? (editing ? textArea : displayComment) : displayComment}
            {isAuthor && !existingReview && textArea}
          </div>
        </div>
      </div>
      {isAuthor && editToggleButton}
    </div>
  );
}
