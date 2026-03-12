import { Review } from "@/lib/types/domain";

export function ReviewDisplay({ review }: { review: Review }) {
  return (
    <div>
      <div className="pl-2"> {review.comment}</div>
    </div>
  );
}