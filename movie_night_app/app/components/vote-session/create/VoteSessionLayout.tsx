'use client';

import { useState } from 'react';
import { Layout, VoteMoviesLayoutProps } from '@/lib/types/ui';
import VoteMovieCard from './VoteMovieCard';
import { VoteKey } from '@/lib/types/db';
import { toggleVoteAction } from '@/lib/actions/toggleVoteAction';
import router from 'next/router';

export default function VoteSessionLayout({
  movies,
  loggedInUser,
  users,
  createdBy,
  voteSession,
  votesByMovie,
}: VoteMoviesLayoutProps) {
  const [layout, setLayout] = useState<Layout>('grid');
  const headerTitle = 'Vote For Movie';

  const toggleVote = async (id: number) => {
    if (!loggedInUser) {
      alert('Please Login to Vote!');
      return;
    }

    const vote: VoteKey = {
      voteSessionId: voteSession.id,
      movieId: id,
      userId: Number(loggedInUser.id),
    };

    await toggleVoteAction(vote);
  };

  const moviesForVoting = (
    <div className="flex  gap-4 p-4 bg-base-100 rounded-box w-full">
      {movies.map((movie) => {
        const voteInfo = votesByMovie.find((vote) => vote.movieId === movie.id);

        return (
          <div key={movie.id} className="flex flex-col items-center">
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
            {/* VOTES */}
            <div className='flex flex-col gap-2 m-2'>
              <div className="text-3xl badge badge-secondary p-4 badge-outline ">
                {voteInfo?.count}
              </div>
              {voteInfo?.users.map((user) => (
                <div className="" key={user.id}>
                  {user.name}
                </div>
              ))}
            </div>
          </div>
        );
      })}
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
        {/* {votes} */}
      </div>
    </div>
  );
}
