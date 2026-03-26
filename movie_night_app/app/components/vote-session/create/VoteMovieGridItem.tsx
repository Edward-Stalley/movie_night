import { MoviePoster as MoviePosterTypes } from '@/lib/types/ui';
import { MoviePoster } from '@/app/components/shared/MoviePoster';

type VoteMovieGridItemProps = MoviePosterTypes & {
  selectable?: boolean;
  selected?: boolean;
  onSelect?: () => void;
  voteInSession?: boolean;
  voteCompleted?: boolean;
  toggleVote?: () => void;
};

export function VoteMovieGridItem({
  id,
  posterPath,
  title,
  urlRoute,
  selectable,
  selected,
  onSelect,
  voteInSession,
  voteCompleted,
  toggleVote,
}: VoteMovieGridItemProps) {
  return (
    <div className="group relative transition-transform duration-300 hover:scale-103 bg-base-300 border-2 rounded-2xl flex flex-col">
      <MoviePoster
        id={id}
        posterPath={posterPath}
        title={title}
        urlRoute={urlRoute}
        selected={selected}
      />

      {/* CREATE VOTING SESSION  */}
      {selectable && (
        <div
          onClick={(e) => {
            e.stopPropagation();
            voteInSession ? toggleVote?.() : onSelect?.();
          }}
          className={`flex flex-col justify-content items-center rounded-bl-2xl rounded-br-2xl  cursor-pointer hover:bg-primary hover:text-base-content ${selected ? 'hover:' : ''}`}
        >
          <div className="text-2xl font-bold rounded-2xl">{selected ? '-' : '+'}</div>
        </div>
      )}
      {/* VOTING IN SESSION */}
      {voteInSession && (
        <button
          className="hover:bg-primary hover:text-primary-content cursor-pointer rounded-b-2xl"
          onClick={toggleVote}
        >
          Vote
        </button>
      )}
    </div>
  );
}
