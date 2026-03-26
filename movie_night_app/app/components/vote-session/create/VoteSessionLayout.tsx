'use client';

import { useState } from 'react';
import { Layout, VoteMoviesLayoutProps } from '@/lib/types/ui';
import VoteMovieCard from './VoteMovieCard';
import { VoteInsert } from '@/lib/types/db';
import { toggleVoteAction } from '@/lib/actions/toggleVoteAction';

export default function VoteSessionLayout({
  movies,
  loggedInUser,
  users,
  createdBy,
  voteSession,
}: VoteMoviesLayoutProps) {
  const [layout, setLayout] = useState<Layout>('grid');
  const headerTitle = 'Vote For Movie';

  const toggleVote = async (id: number) => {
    if (!loggedInUser) {
      alert('Please Login to Vote!');
      return;
    }

    const vote: VoteInsert = {
      voteSessionId: voteSession.id,
      movieId: id,
      userId: Number(loggedInUser.id),
    };

    await toggleVoteAction(vote);
  };

  const moviesForVoting = (
    <div className="flex  gap-4 p-4 bg-base-100 rounded-box w-full">
      {movies.map((movie) => (
        <div key={movie.id} className=" ">
          <VoteMovieCard
            key={movie.id}
            movie={movie}
            layout={layout}
            VotingSessionProps={{
              voteInSession: true,
              voteCompleted: false,
              toggleVote: toggleVote,
              canVote: !!loggedInUser,
            }}
          />
        </div>
      ))}
    </div>
  );

  return (
    <div className="flex flex-col m-2  ">
      <h1 className="text-6xl">{headerTitle}</h1>
      <div className="bg-base-200 w-fit p-2 rounded-2xl ml-2">
        <h1>Created By: {createdBy.name}</h1>
        <h2>Movie Night: {voteSession.movieNightDate.toDateString()}</h2>
      </div>
      <div className="flex justify-center items-center b">
        <div>{moviesForVoting}</div>
      </div>
      {/* TO DO: ADD VOTE GRAPH */}
      <div className="flex flex-col justify-center items-center">
        <p>GRAPH HERE</p>
      </div>
    </div>
  );
}
