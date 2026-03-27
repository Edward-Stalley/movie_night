import { MoviePoster } from '@/app/components/shared/MoviePoster';
import ChosenByInput from '../ui/ChosenByInput';
import { ReviewRow } from './reviews/ReviewRow';
import { ReviewRowAdd } from './reviews/ReviewRowAdd';
import { LoggedInUser, Review, User, WatchedMovie } from '@/lib/types/domain';
import { DeleteMovieButton } from '../shared/DeleteMovieButton';
import { IsDetailScreen, MovieDeleteHandler } from '@/lib/types/ui';
import WatchedDateInput from './WatchedDateInput';

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
        title={movie.title}
        urlRoute="watched-movies"
        className="rounded-2xl"
      />
      <DeleteMovieButton onDelete={onDelete} isDetailScreen={isDetailScreen} />

      <div className="flex flex-col">
        {!isDetailScreen && <div className="text-3xl">{movie.title}</div>}
        <div>
          <div className="flex gap-1">
            <WatchedDateInput movie={movie} />
            <ChosenByInput movie={movie} users={users} />
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
