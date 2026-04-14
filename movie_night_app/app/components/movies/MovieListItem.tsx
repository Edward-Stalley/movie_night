import { StoredMovie } from '@/lib/types/domain';
import { MoviePoster } from '@/app/components/shared/MoviePoster';
import { TrailerLinkButton } from '../shared/TrailerLinkButton';
import { YouTubeEmbed } from '@next/third-parties/google';
import { getYouTubeId } from '@/lib/utils/tmdb/getYoutubeId';

type MovieListItemProps = {
  movie: StoredMovie;
};

export function MovieListItem({ movie }: MovieListItemProps) {
  const trailerId = getYouTubeId(movie.trailerUrl);

  return (
    <div className="flex flex-col gap-4 bg-base-300 m-2 rounded-2xl relative">
      <div className="flex flex-col gap-2 pl-2 lg:flex-row md:flex-row">
        <p className='font-extrabold text-lg'>{movie.title}</p>
        <div className="flex ">
          <MoviePoster
            id={movie.id}
            posterPath={movie.posterPath}
            title={movie.title}
            urlRoute="movies"
            className="rounded-2xl"
          />
        </div>
        <div className=" p-4 bg-base-200 rounded-2xl flex-2 ">{movie.overview}</div>
        <div className="flex flex-col  bg-base-200 p-2 flex-1  ">
          <div className="flex-1 rounded-2xl p-2">
            <div className="border-b-2 p-2 flex justify-between">
              <p className="font-bold text-1xl text-primary ">Trailer</p>
              {movie.trailerUrl && <TrailerLinkButton trailerLink={movie.trailerUrl} />}
            </div>

            {trailerId ? (
              <YouTubeEmbed videoid={trailerId} />
            ) : (
              <p className="p-2">No Trailer Available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
