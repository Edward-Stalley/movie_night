import { SearchedMovie } from '@/lib/types/domain';
import { MoviePoster } from '@/app/components/shared/MoviePoster';

type SearchedMovieListItemProps = {
  movie: SearchedMovie;
};

export function SearchedMovieListItem({ movie }: SearchedMovieListItemProps) {
  return (
    <div className="relative flex gap-4 bg-base-300 m-2 p-2 rounded-2xl w-full">
      <div className="">
        <MoviePoster
          id={movie.tmdbId}
          posterPath={movie.posterPath}
          title={movie.title}
          urlRoute="movies"
          className="rounded-2xl mb-2"
        />
        <button className="btn btn-primary btn-soft w-full ">
          <a
            className=" p-2 m-2"
            href={`${movie.trailerUrl ?? '#'}`}
            target="blank"
            rel="noopener noreferrer"
          >
            {movie.trailerUrl ? 'Trailer Link' : ' No Trailer'}
          </a>
        </button>
      </div>

      <div className="w-full  flex flex-col ">
        <div className=" p-4 bg-base-200 rounded-2xl h-full ">{movie.overview}</div>
      </div>
    </div>
  );
}
