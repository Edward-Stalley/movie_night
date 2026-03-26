'use client';

import { VoteMovieCardCardProps } from '@/lib/types/ui';
import { VoteMovieGridItem } from './VoteMovieGridItem';

export default function VoteMovieCard({
  movie,
  layout,
  CreateVotingSessionProps,
  VotingSessionProps,
}: VoteMovieCardCardProps) {
  // CREATE VOTING
  const { selectable = false, selected = false, onSelect } = CreateVotingSessionProps || {};
  // VOTE IN SESSION
  const { voteInSession = false, voteCompleted = false, toggleVote } = VotingSessionProps || {};

  return (
    <li className="relative group">
      {layout === 'grid' && (
        <VoteMovieGridItem
          id={movie.id}
          posterPath={movie.posterPath}
          title={movie.title}
          urlRoute="movies"
          selectable={selectable}
          selected={selected}
          onSelect={selectable ? () => onSelect?.(movie.id) : undefined}
          voteInSession={voteInSession}
          voteCompleted={voteCompleted}
          toggleVote={voteInSession ? () => toggleVote?.(movie.id) : undefined}
        />
      )}
    </li>
  );
}
