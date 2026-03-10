import { StarRatingProps } from "@/lib/types/domain";
import { useState } from "react";

export default function StarRating({
  rating,
  max = 5,
  onClick,
}: StarRatingProps) {
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const displayRating = hoverRating ?? rating ?? 0;

  return (
    <div className="flex">
      {Array.from({ length: max }).map((_, i) => {
        const starValue = i + 1;
        return (
          <svg
            key={i}
            onClick={() => {
              onClick?.(starValue);
            }}
            onMouseEnter={() => setHoverRating(starValue)}
            onMouseLeave={() => setHoverRating(null)}
            className={`w-5 h-5 cursor-pointer hover:text-amber-400 ${
              starValue <= displayRating ? "text-amber-400" : "text-gray-300"
            }`}
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 2l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z" />
          </svg>
        );
      })}
    </div>
  );
}
