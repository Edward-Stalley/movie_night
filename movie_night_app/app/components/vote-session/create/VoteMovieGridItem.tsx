import { MoviePoster as MoviePosterTypes, VoidHandler } from '@/lib/types/ui';
import { MoviePoster } from '@/app/components/shared/MoviePoster';
import { MinusCircleIcon, PlusCircleIcon } from '@heroicons/react/16/solid';

type VoteMovieGridItemProps = MoviePosterTypes & {
  selectable?: boolean;
  selected?: boolean;
  toggleSelect?: VoidHandler;
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
    <div className="group relative transition-transform duration-300 hover:scale-103  border-2 rounded-2xl overflow-hidden">
      <div className="relative w-full aspect-2/3">
        <MoviePoster
          id={id}
          posterPath={posterPath}
          title={title}
          urlRoute={urlRoute}
          selected={selected}
          className={`${selectable && 'rounded-none rounded-t-2xl  border-b border-neutral-50'} rounded-2xl`}
          disableLink={true}
        />
      </div>

      {/* CREATE VOTING SESSION  */}
      {selectable && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleSelect?.();
          }}
          className={`btn btn-soft ${selected ? 'btn-secondary' : 'btn-primary'} w-full rounded-none rounded-b-2xl`}
        >
          <div className="text-2xl font-bold rounded-2xl">
            {selected ? (
              <MinusCircleIcon className="h-5 w-5" />
            ) : (
              <PlusCircleIcon className="h-5 w-5" />
            )}
          </div>
        </button>
      )}
    </div>
  );
}
