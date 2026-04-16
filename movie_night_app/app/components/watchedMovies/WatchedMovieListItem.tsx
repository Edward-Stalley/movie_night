import { MoviePoster } from '@/app/components/shared/MoviePoster';
import ChosenByInput from '../ui/ChosenByInput';
import { ReviewRow } from './reviews/ReviewRow';
import { ReviewRowAdd } from './reviews/ReviewRowAdd';
import { LoggedInUser, Review, User, WatchedMovie } from '@/lib/types/domain';
import { IsDetailScreen, MovieDeleteHandler } from '@/lib/types/ui';
import WatchedDateInput from './WatchedDateInput';
import Link from 'next/link';
import { DocumentMagnifyingGlassIcon, TrashIcon } from '@heroicons/react/20/solid';

type WatchedMovieListItemProps = {
  movie: WatchedMovie;
  users: User[];
  loggedInUser?: LoggedInUser;
  onDelete: MovieDeleteHandler;
  isDetailScreen: IsDetailScreen;
  editMode: boolean;
};

export function WatchedMovieListItem({
  movie,
  users,
  loggedInUser,
  onDelete,
  isDetailScreen,
  editMode,
}: WatchedMovieListItemProps) {
  const userReview = movie.reviews.some((r) => {
    return r.ratedById === Number(loggedInUser?.id);
  });
  return (
    <div className="relative flex gap-4 bg-base-300 m-2 p-2 rounded-none flex-col sm:flex-row border-b ">
      <div className="text-xl font-bold pl-4 flex justify-start w-full md:w-50  ">{movie.title}</div>
      <div className="flex flex-1">
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
        <div className="flex flex-col pl-4 pt-2 pb-2 gap-1 flex-1 rounded-2xl ml-2 mr-3 justify-between ">
          <div>
            <label className="font-bold">Watched On:</label>
            <div className="flex justify-start pl-2 mt-1">
              <WatchedDateInput movie={movie} />
            </div>
          </div>
          <div>
            <label className="font-bold ">Chosen By:</label>
            <div className=" pl-2 mt-1 ">
              <ChosenByInput movie={movie} users={users} />
            </div>
          </div>
          <div className="flex  justify-end pr-5 ml-2">
            <div className="flex btn btn-outline  ">
              <Link href={`/movies/${movie.movieId}`} className="">
                <DocumentMagnifyingGlassIcon className="h-5 w-5" />
              </Link>
            </div>

            <div className="ml-2 w-8 mr-2">
              <button
                onClick={onDelete}
                disabled={!editMode}
                className="btn btn-outline btn-secondary"
              >
                {<TrashIcon className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col p-2 flex-1">
        <div>
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
