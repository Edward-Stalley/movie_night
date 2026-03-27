'use client';

import { VoteMovieCardCardProps } from '@/lib/types/ui';
import { VoteMovieGridItem } from './VoteMovieGridItem';

export default function VoteMovieCard({
  movie,
  layout,
  CreateVotingSessionProps,
}: VoteMovieCardCardProps) {
  // CREATE VOTING
  const { selectable = false, selected = false, toggleSelect } = CreateVotingSessionProps || {};

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
          toggleSelect={selectable ? () => toggleSelect?.(movie.id) : undefined}
        />
      )}
    </li>
  );
}
