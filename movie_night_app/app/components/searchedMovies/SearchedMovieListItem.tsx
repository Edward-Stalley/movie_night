import { SearchedMovie } from '@/lib/types/domain';
import { MoviePoster } from '@/app/components/shared/MoviePoster';
import { TrailerLinkButton } from '../shared/TrailerLinkButton';

type SearchedMovieListItemProps = {
  movie: SearchedMovie;
};

export function SearchedMovieListItem({ movie }: SearchedMovieListItemProps) {
  return (
    <div className="relative flex gap-4 bg-base-300 m-2 p-2 rounded-2xl w-full">
      <div className="w-28 sm:w-32 md:w-36 shrink-0">
        <div className="relative  aspect-2/3  w-full overflow-hidden rounded-2xl">
          <MoviePoster
            id={movie.tmdbId}
            posterPath={movie.posterPath}
            title={movie.title}
            urlRoute="movies"
            className="rounded-2xl mb-2"
          />
          {movie.trailerUrl && <TrailerLinkButton trailerLink={movie.trailerUrl} />}
        </div>
      </div>
      <div className="w-full  flex flex-col ">
        <div className=" p-4 bg-base-200 rounded-2xl h-full ">{movie.overview}</div>
      </div>
    </div>
  );
}
