'use client';

// import WatchedMovieCard from '@/app/components/watchedMovies/WatchedMovieCard';
import { useState } from 'react';
import { GridOrList } from '@/app/components/layout/GridOrList';
import { Layout, WatchedMoviesLayoutProps, VoteMoviesLayoutProps } from '@/lib/types/ui';
// import { SORT_OPTIONS_WATCHED_MOVIES } from '@/lib/config/sorts';
import MovieCard from '../../movies/MovieCard';
import VoteMovieCard from './VoteMovieCard';

export default function VoteSessionLayout({ movies, loggedInUser, users }: VoteMoviesLayoutProps) {
  const [layout, setLayout] = useState<Layout>('grid');
  const headerTitle = 'Vote For Movie';

  const moviesForVoting = (
    <div className="flex  gap-4 p-4 bg-base-100 rounded-box w-full">
      {movies.map((movie) => (
        <div key={movie.id} className=" ">
          <VoteMovieCard
            key={movie.id}
            movie={movie}
            layout={'grid'}
            VotingSessionProps={{
              voteInSession: true,
              voteCompleted: false,
              // toggleVote: toggleVote,
            }}
          />
        </div>
      ))}
    </div>
  );

  return <div>{moviesForVoting}</div>;
}
