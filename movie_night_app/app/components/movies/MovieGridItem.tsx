import {
  MovieDeleteHandler,
  MoviePoster as MoviePosterTypes,
  WatchedMovieAddHandler,
} from '@/lib/types/ui';
import { MoviePoster } from '@/app/components/shared/MoviePoster';
import { DeleteMovieButton } from '../shared/DeleteMovieButton';
import { AddMovieToWatchedButton } from '@/app/components/watchedMovies/AddMovieToWatchedButton';

type MovieGridItemProps = MoviePosterTypes & {
  onDelete: MovieDeleteHandler;
  onAdd?: WatchedMovieAddHandler;
  selectable?: boolean;
  selected?: boolean;
  toggleSelect?: () => void;
  voteInSession?: boolean;
  voteCompleted?: boolean;
  toggleVote?: () => void;
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
}: MovieGridItemProps) {
  return (
    <div className="group relative transition-transform duration-300 hover:scale-103 bg-base-300 rounded-2xl border-2 flex flex-col justify-center items-center">
      <MoviePoster
        id={id}
        posterPath={posterPath}
        title={title}
        urlRoute={urlRoute}
        selected={selected}
        className="rounded-2xl"
      />
      {onDelete && !selectable && !voteInSession && (
        <DeleteMovieButton onDelete={onDelete} isDetailScreen={false} />
      )}
      {onAdd && !selectable && !voteInSession && (
        <AddMovieToWatchedButton onAdd={onAdd} isDetailScreen={false} />
      )}
    </div>
  );
}
