import { MoviePoster as MoviePosterTypes, SearchedMovieAddHandler } from '@/lib/types/ui';
import { MoviePoster } from '@/app/components/shared/MoviePoster';
import { AddSearchedMovieToMoviesButton } from './AddSearchedMovieToMoviesButton';

type SearchedMovieGridItemProps = MoviePosterTypes & {
  onAdd: SearchedMovieAddHandler;
};

export function SearchedMovieGridItem({
  id,
  posterPath,
  originalTitle,
  urlRoute,
  onAdd,
}: SearchedMovieGridItemProps) {
  return (
    <div className="group relative transition-transform duration-300 hover:scale-103 bg-base-300 border-2 rounded-2xl">
      <MoviePoster
        id={id}
        posterPath={posterPath}
        originalTitle={originalTitle}
        urlRoute={urlRoute}
      />
      {onAdd && <AddSearchedMovieToMoviesButton onAdd={onAdd} isDetailScreen={false} />}
    </div>
  );
}
