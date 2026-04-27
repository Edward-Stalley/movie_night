import { VoidHandler } from '@/lib/types/ui';
import { MoviePoster } from '@/app/components/shared/MoviePoster';
import { AddSearchedMovieToMoviesButton } from './AddSearchedMovieToMoviesButton';
import { SearchedMovie } from '@/lib/types/domain';

type SearchedMovieGridItemProps = {
  onAdd: VoidHandler;
  movie: SearchedMovie;
  urlRoute?: string;
  editMode: boolean;
};

export function SearchedMovieGridItem({ movie, urlRoute, onAdd }: SearchedMovieGridItemProps) {
  return (
    <div className="group relative transition-transform duration-300 hover:scale-103 bg-base-300 border-2 rounded-2xl overflow-hidden">
      <div className="relative w-full aspect-2/3">
        <MoviePoster
          id={movie.tmdbId}
          urlRoute={urlRoute}
          posterPath={movie.posterPath}
          title={movie.title}
          className="rounded-2xl"
        />
      </div>
      {onAdd && <AddSearchedMovieToMoviesButton onAdd={onAdd} isDetailScreen={false} />}
    </div>
  );
}
