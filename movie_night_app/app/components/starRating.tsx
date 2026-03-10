import { StarRatingProps } from "@/lib/types/domain";

export default function StarRating({ rating, max = 5 }: StarRatingProps) {
  const safeRating = rating ?? 0;

  return (
    <div className="flex">
      {Array.from({ length: max }).map((_, i) => (
        <svg
          key={i}
          className={`w-5 h-5 ${
            i < safeRating ? "text-yellow-400" : "text-gray-300"
          }`}
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 2l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z" />
        </svg>
      ))}
    </div>
  );
}
