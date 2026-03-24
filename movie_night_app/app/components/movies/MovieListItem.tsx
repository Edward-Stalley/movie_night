import { StoredMovie } from '@/lib/types/domain';
import { MoviePoster } from '@/app/components/shared/MoviePoster';

type MovieListItemProps = {
  movie: StoredMovie;
};

export function MovieListItem({ movie }: MovieListItemProps) {
  return (
    <div className="relative flex gap-4 bg-base-300 m-2 p-2 rounded-2xl w-full">
      <div className="">
        <MoviePoster
          id={movie.id}
          posterPath={movie.posterPath}
          title={movie.title}
          urlRoute="movies"
        />
      </div>

      <div className="w-full  flex flex-col ">
        <div className=" p-4 bg-base-200 rounded-2xl h-full ">{movie.overview}</div>
      </div>
    </div>
  );
}
