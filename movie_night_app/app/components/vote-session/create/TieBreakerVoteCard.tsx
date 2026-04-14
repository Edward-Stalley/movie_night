'use client';

import { TieBreakerCardCardProps } from '@/lib/types/ui';
import { VoteMovieGridItem } from './VoteMovieGridItem';

export default function VoteMovieCard({ movie, finalVote }: TieBreakerCardCardProps) {
  return (
    <li className="group flex-col justify-center relative">
      <VoteMovieGridItem
        id={movie.id}
        posterPath={movie.posterPath}
        title={movie.title}
        urlRoute="movies"
      />
      <button
        className="btn btn-secondary h-8  w-full absolute bottom-0 rounded-t-none"
        onClick={() => finalVote(movie.id)}
      >
        Choose
      </button>
    </li>
  );
}
