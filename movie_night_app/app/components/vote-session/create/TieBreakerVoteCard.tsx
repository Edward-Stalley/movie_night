'use client';

import { TieBreakerCardCardProps } from '@/lib/types/ui';
import { VoteMovieGridItem } from './VoteMovieGridItem';
import { EyeIcon } from '@heroicons/react/20/solid';

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
        className="btn btn-secondary h-8  w-full bottom-0 mt-2"
        onClick={() => finalVote(movie.id)}
      >
        <EyeIcon className="h-5 w-5" />
      </button>
    </li>
  );
}
