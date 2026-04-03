import { MoviePoster as MoviePosterTypes, SearchedMovieAddHandler } from '@/lib/types/ui';
import { MoviePoster } from '@/app/components/shared/MoviePoster';
import { AddSearchedMovieToMoviesButton } from './AddSearchedMovieToMoviesButton';
import { SearchedMovie } from '@/lib/types/domain';

type SearchedMovieGridItemProps = {
  onAdd: SearchedMovieAddHandler;
  movie: SearchedMovie;
  urlRoute?: string;
};

export function SearchedMovieGridItem({ movie, urlRoute, onAdd }: SearchedMovieGridItemProps) {
  return (
    <div className="group relative transition-transform duration-300 hover:scale-103 bg-base-300 border-2 rounded-2xl">
      <MoviePoster
        id={movie.tmdbId}
        urlRoute={urlRoute}
        posterPath={movie.posterPath}
        title={movie.title}
        className="rounded-2xl"
      />
      {onAdd && <AddSearchedMovieToMoviesButton onAdd={onAdd} isDetailScreen={false} />}
    </div>
  );
}
