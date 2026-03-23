import { MoviePoster } from '@/app/components/shared/MoviePoster';
import DateInput from '../ui/DateInput';
import ChosenByInput from '../ui/ChosenByInput';
import { ReviewRow } from './reviews/ReviewRow';
import { ReviewRowAdd } from './reviews/ReviewRowAdd';
import { LoggedInUser, Review, User, WatchedMovie } from '@/lib/types/domain';
import { DeleteMovieButton } from '../shared/DeleteMovieButton';
import { IsDetailScreen, MovieDeleteHandler } from '@/lib/types/ui';

type WatchedMovieListItemProps = {
  movie: WatchedMovie;
  users: User[];
  loggedInUser?: LoggedInUser;
  onDelete: MovieDeleteHandler;
  isDetailScreen: IsDetailScreen;
};

export function WatchedMovieListItem({
  movie,
  users,
  loggedInUser,
  onDelete,
  isDetailScreen,
}: WatchedMovieListItemProps) {
  const userReview = movie.reviews.some((r) => r.ratedBy === loggedInUser?.name);

  return (
    <div className=" relative flex gap-4 bg-base-300 m-2 p-2 rounded-2xl">
      <MoviePoster
        id={movie.movieId}
        posterPath={movie.posterPath}
        originalTitle={movie.originalTitle}
        urlRoute="watched-movies"
      />
      <DeleteMovieButton onDelete={onDelete} isDetailScreen={isDetailScreen} />

      <div className="flex flex-col">
        {!isDetailScreen && <div className="text-3xl">{movie.originalTitle}</div>}
        <div>
          <div className="flex gap-1">
            <div>
              <DateInput movie={movie} />
            </div>
            <div>
              <ChosenByInput movie={movie} users={users} />
            </div>
          </div>
          {movie.reviews.map((review: Review) => (
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
      </div>
    </div>
  );
}
