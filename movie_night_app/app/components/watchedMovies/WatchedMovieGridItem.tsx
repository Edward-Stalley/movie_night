import { VoidHandler, MoviePoster as MoviePosterTypes } from '@/lib/types/ui';
import { MoviePoster } from '@/app/components/shared/MoviePoster';
import { DeleteMovieButton } from '@/app/components/shared/DeleteMovieButton';
import { AddMovieToWatchedButton } from './AddMovieToWatchedButton';
import Image from 'next/image';
import { toIso } from '@/lib/transform';

type MovieGridItemProps = MoviePosterTypes & {
  onDelete: VoidHandler;
  onAdd?: VoidHandler;
  watchedOn?: Date;
  chosenByName?: string;
  chosenByImage?: string;
  editMode: boolean;
};

export function WatchedMovieGridItem({
  id,
  posterPath,
  title,
  urlRoute,
  onDelete,
  onAdd,
  watchedOn,
  chosenByName,
  chosenByImage,
  editMode,
}: MovieGridItemProps) {
  return (
    <div className="group relative transition-transform duration-300 hover:scale-103 bg-base-300 border-2 rounded-2xl overflow-hidden">
      <div className="relative w-full aspect-2/3">
        <MoviePoster
          id={id}
          posterPath={posterPath}
          title={title}
          urlRoute={urlRoute}
          className="rounded-t-2xl"
        />
      </div>
      {onDelete && editMode && <DeleteMovieButton onDelete={onDelete} isDetailScreen={false} />}
      {onAdd && editMode && <AddMovieToWatchedButton onAdd={onAdd} isDetailScreen={false} />}
      <div className="flex gap-2 justify-center items-center p-1 w-full">
        {watchedOn && <div className="text-xs md:text-sm">{toIso(watchedOn)}</div>}
        {chosenByImage ? (
          <Image
            src={`${chosenByImage}`}
            alt={`${chosenByName}`}
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
