import { WatchedMovieCardProps } from '@/lib/types/domain';
import Image from 'next/image';
import { ReviewRow, ReviewRowAdd } from '@/app/components/watched-movies/reviews';
import Link from 'next/link';
import DateInput from './ui/DateInput';
import ChosenByInput from './ui/ChosenByInput';

export default function WatchedMovieCard({
  movie,
  loggedInUser,
  isDetailScreen,
  layout,
  users,
}: WatchedMovieCardProps) {
  const userReview = movie.reviews.some((r) => r.ratedBy === loggedInUser?.name);


  return (
    <li key={`${movie.chosenBy}+${movie.id}`} className="list-row bg-neutral m-4">
      <div className="text-4xl font-thin opacity-30 tabular-nums"></div>

      <div>
        <Link href={`/watched-movies/${movie.movieId}`} key={movie.tmdbId}>
          <Image
            className="rounded-xl"
            src={`https://image.tmdb.org/t/p/w500/${movie.posterPath}`}
            width={210}
            height={315}
            priority
            alt={`${movie.originalTitle} (${movie.movieId})`}
            loading="eager"
          />
        </Link>
      </div>
      <div className="list-col-grow">
        {!isDetailScreen && layout === 'list' && (
          <div className="text-3xl">{movie.originalTitle}</div>
        )}
        {layout === 'list' && (
          <div>
            <div className="flex">
              <div>
                <DateInput movie={movie} />
              </div>
              <div>
                <ChosenByInput movie={movie} users={users} />
              </div>
            </div>
            {movie.reviews.map((review) => (
              <ReviewRow
                key={review.ratedBy}
                loggedInUser={loggedInUser}
                movie={movie}
                review={review}
              />
            ))}
            {!userReview && (
              <ReviewRowAdd key={loggedInUser?.id} movie={movie} loggedInUser={loggedInUser} />
            )}
          </div>
        )}
      </div>
    </li>
  );
}
