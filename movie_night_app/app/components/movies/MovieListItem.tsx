import { StoredMovie } from '@/lib/types/domain';
import { MoviePoster } from '@/app/components/shared/MoviePoster';
import { TrailerLinkButton } from '../shared/TrailerLinkButton';
import { YouTubeEmbed } from '@next/third-parties/google';
import { getYouTubeId } from '@/lib/utils/tmdb/getYoutubeId';
import { TrashIcon, VideoCameraIcon, VideoCameraSlashIcon } from '@heroicons/react/20/solid';
import { VoidHandler } from '@/lib/types/ui';

type MovieListItemProps = {
  movie: StoredMovie;
  editMode: boolean;
  onDelete: VoidHandler;
};

export function MovieListItem({ movie, editMode, onDelete }: MovieListItemProps) {
  const trailerId = getYouTubeId(movie.trailerUrl);

  return (
    <div className="flex flex-col gap-4 bg-base-300 m-2  relative p-2 border-b">
      <p className="font-extrabold text-lg">{movie.title}</p>
      <div className="flex items-start gap-2 pl-2 justify-between">
        {/* Poster */}
        <div className="w-28 sm:w-32 md:w-36 shrink-0">
          <div className="relative  aspect-2/3  w-full overflow-hidden rounded-2xl">
            <MoviePoster
              id={movie.id}
              posterPath={movie.posterPath}
              title={movie.title}
              urlRoute="movies"
              className="object-cover"
            />
          </div>
        </div>

        {/* Content Wrapper */}
        <div className="flex flex-col md:flex-row flex-1 gap-4">
          {/* OVERVIEW */}
          {/* TRAILER */}
          <div className="w-full md:w-72 md:shrink-0">
            <div className="flex-1 rounded-2xl p-2">
              <div className="border-b-2 pl-2 pr-0 pt-2 pb-2 flex justify-between items-center">
                {movie.trailerUrl ? (
                  <VideoCameraIcon className="h-5 w-5" />
                ) : (
                  <VideoCameraSlashIcon className="h-5 w-5 text-secondary" />
                )}
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
      <div className="p-4 rounded-2xl md:flex-1">{movie.overview}</div>
      <div className="flex justify-end">
        <button onClick={onDelete} disabled={!editMode} className="btn btn-outline btn-secondary">
          {<TrashIcon className="w-5 h-5" />}
        </button>
      </div>
    </div>
  );
}
