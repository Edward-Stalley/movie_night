import {
  MovieDeleteHandler,
  MoviePoster as MoviePosterTypes,
  WatchedMovieAddHandler,
} from '@/lib/types/ui';
import { MoviePoster } from '@/app/components/shared/MoviePoster';
import { DeleteMovieButton } from '../shared/DeleteMovieButton';
import { AddMovieToWatchedButton } from '../watched-movies/AddMovieToWatchedButton';
import Image from 'next/image';

type MovieGridItemProps = MoviePosterTypes & {
  onDelete: MovieDeleteHandler;
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
    <div className="group relative transition-transform duration-300 hover:scale-103 bg-base-300 border-2 rounded-2xl">
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
