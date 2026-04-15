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
  const userReview = movie.reviews.some((r) => {
    return r.ratedById === Number(loggedInUser?.id);
  });
  return (
    <div className="relative flex gap-4 bg-base-300 m-2 p-2 rounded-none flex-col sm:flex-row border-b ">
      <div className="ml-2 w-28 sm:w-32 md:w-36 shrink-0">
        <div className="relative  aspect-2/3  w-full overflow-hidden rounded-2xl">
          <MoviePoster
            id={movie.movieId}
            posterPath={movie.posterPath}
            title={movie.title}
            urlRoute="watched-movies"
            className="rounded-2xl"
          />
        </div>
      </div>
      {/* <DeleteMovieButton onDelete={onDelete} isDetailScreen={isDetailScreen} /> */}

      <div className="flex flex-col p-2">
        {!isDetailScreen && <div className="text-sm font-bold">{movie.title}</div>}
        <div>
          <div className="flex gap-1">
            <WatchedDateInput movie={movie} />
            <ChosenByInput movie={movie} users={users} />
          </div>
          {movie.reviews.map((review: Review) => (
            <ReviewRow
              key={review.ratedById}
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
