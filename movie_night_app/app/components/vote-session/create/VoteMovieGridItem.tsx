import { MoviePoster as MoviePosterTypes } from '@/lib/types/ui';
import { MoviePoster } from '@/app/components/shared/MoviePoster';

type VoteMovieGridItemProps = MoviePosterTypes & {
  selectable?: boolean;
  selected?: boolean;
  toggleSelect?: () => void;
};

export function VoteMovieGridItem({
  id,
  posterPath,
  title,
  urlRoute,
  selectable,
  selected,
  toggleSelect,
}: VoteMovieGridItemProps) {
  return (
    <div className="group relative transition-transform duration-300 hover:scale-103 bg-base-300 rounded-2xl border-2 flex flex-col justify-center items-center">
      <MoviePoster
        id={id}
        posterPath={posterPath}
        title={title}
        urlRoute={urlRoute}
        selected={selected}
        className="rounded-t-2xl border-b border-secondary"
        disableLink={true}
      />

      {/* CREATE VOTING SESSION  */}
      {selectable && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleSelect?.();
          }}
          className="btn btn-soft btn-secondary w-full rounded-none rounded-b-2xl"
        >
          <div className="text-2xl font-bold rounded-2xl">{selected ? '-' : '+'}</div>
        </button>
      )}
    </div>
  );
}
