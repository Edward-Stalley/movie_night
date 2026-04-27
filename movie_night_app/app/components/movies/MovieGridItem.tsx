import {
  MoviePoster as MoviePosterTypes,
  VoidHandler,
} from '@/lib/types/ui';
import { MoviePoster } from '@/app/components/shared/MoviePoster';
import { DeleteMovieButton } from '../shared/DeleteMovieButton';
import { AddMovieToWatchedButton } from '@/app/components/watchedMovies/AddMovieToWatchedButton';

type MovieGridItemProps = MoviePosterTypes & {
  onDelete: VoidHandler;
  onAdd?: VoidHandler;
  selectable?: boolean;
  selected?: boolean;
  toggleSelect?: VoidHandler;
  voteInSession?: boolean;
  voteCompleted?: boolean;
  toggleVote?: VoidHandler;
  index?: number;
  editMode: boolean;
};

export function MovieGridItem({
  id,
  posterPath,
  title,
  urlRoute,
  onDelete,
  onAdd,
  selectable,
  selected,
  voteInSession,
  index,
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
          selected={selected}
          // className="object-cover"
          priority={index !== undefined && index < 4}
        />
      </div>
      {onDelete && editMode && !selectable && !voteInSession && (
        <DeleteMovieButton onDelete={onDelete} isDetailScreen={false} />
      )}
      {onAdd && editMode && !selectable && !voteInSession && (
        <AddMovieToWatchedButton onAdd={onAdd} isDetailScreen={false} />
      )}
    </div>
  );
}
