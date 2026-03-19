import {
  MovieDeleteHandler,
  MoviePoster as MoviePosterTypes,
  WatchedMovieAddHandler,
} from '@/lib/types/ui';
import { MoviePoster } from '@/app/components/shared/MoviePoster';
import { DeleteMovieButton } from '@/app/components/shared/DeleteMovieButton';
import { AddMovieToWatchedButton } from '../watched-movies/AddMovieToWatchedButton';
import Image from 'next/image';

type MovieGridItemProps = MoviePosterTypes & {
  onDelete: MovieDeleteHandler;
  onAdd?: WatchedMovieAddHandler;
  watchedOn?: Date;
  chosenBy?: string;
  chosenByImage?: string;
};

export function WatchedMovieGridItem({
  id,
  posterPath,
  originalTitle,
  urlRoute,
  onDelete,
  onAdd,
  watchedOn,
  chosenBy,
  chosenByImage,
}: MovieGridItemProps) {
  return (
    <div className="group relative transition-transform duration-300 hover:scale-103 bg-base-300 rounded-2xl p-1 border-2">
      <MoviePoster
        id={id}
        posterPath={posterPath}
        originalTitle={originalTitle}
        urlRoute={urlRoute}
      />
      {onDelete && <DeleteMovieButton onDelete={onDelete} isDetailScreen={false} />}
      {onAdd && <AddMovieToWatchedButton onAdd={onAdd} isDetailScreen={false} />}
      <div className="flex gap-2 justify-center items-center p-1 w-full">
        {watchedOn && <div className="">{watchedOn?.toDateString()}</div>}
        {chosenByImage ? (
          <Image
            src={`${chosenByImage}`}
            alt={`${chosenBy}`}
            width={100}
            height={100}
            className={`${'opacity-100 group-hover:opacity-100'}  w-auto h-5  rounded-2xl bg-base-300`}
          />
        ) : (
          <div className="h-5 w-5"></div>
        )}
      </div>
    </div>
  );
}
