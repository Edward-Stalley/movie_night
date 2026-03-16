import {
  MovieDeleteHandler,
  MoviePoster as MoviePosterTypes,
  WatchedMovieAddHandler,
} from '@/lib/types/ui';
import { MoviePoster } from '@/app/components/shared/MoviePoster';
import { DeleteMovieButton } from './DeleteMovieButton';
import { AddMovieToWatchedButton } from '../watched-movies/AddMovieToWatchedButton';

type MovieGridItemProps = MoviePosterTypes & { onDelete: MovieDeleteHandler } & {
  onAdd?: WatchedMovieAddHandler;
};

export function MovieGridItem({
  id,
  posterPath,
  originalTitle,
  urlRoute,
  onDelete,
  onAdd,
}: MovieGridItemProps) {
  return (
    <div className="group relative transition-transform duration-300 hover:scale-103">
      <MoviePoster
        id={id}
        posterPath={posterPath}
        originalTitle={originalTitle}
        urlRoute={urlRoute}
      />
      {onDelete && <DeleteMovieButton onDelete={onDelete} isDetailScreen={false} />}
      {onAdd && <AddMovieToWatchedButton onAdd={onAdd} isDetailScreen={false} />}
    </div>
  );
}
