'use client';

import { useState } from 'react';
import { Layout, VoteMoviesLayoutProps } from '@/lib/types/ui';
import VoteMovieCard from './VoteMovieCard';
import { VoteKey, WatchedMovieInsert } from '@/lib/types/db';
import { toggleVoteAction } from '@/lib/actions/toggleVoteAction';
import Image from 'next/image';
import { closeVotingSessionAction } from '@/lib/actions/closeVoting';
import { useRouter } from 'next/navigation';
import { addWatchedMovieAction } from '@/lib/actions/addWatchedMovie';
import { useRef } from 'react';

export default function VoteSessionLayout({
  movies,
  loggedInUser,
  createdBy,
  voteSession,
  votesByMovie,
}: VoteMoviesLayoutProps) {
  const [layout] = useState<Layout>('grid');
  const headerTitle = 'Vote For Movie';
  const router = useRouter();

  const carouselRef = useRef<HTMLDivElement>(null);
  const scrollLeft = () => {
    carouselRef.current?.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = () => {
    carouselRef.current?.scrollBy({ left: 300, behavior: 'smooth' });
  };

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

  const winner =
    votesByMovie.length === 0
      ? null
      : votesByMovie.reduce((currentWinner, movie) => {
          if (movie.count > currentWinner.count) {
            return movie;
          }
          return currentWinner;
        });

  const voteInProgress = voteSession.status === 'inProgress';

  const handleSubmitSessionFinalVote = async () => {
    await closeVotingSessionAction(voteSession.id);
    if (!winner) return; // safety guard

    const data: WatchedMovieInsert = {
      movieId: winner.movieId,
      watchedOn: voteSession.movieNightDate.toLocaleDateString('en-CA'),
      chosenBy: createdBy.id,
    };

    await addWatchedMovieAction(data);
    router.refresh();
  };

  const didUserVote = (voteInfo?: { users: { id: string }[] }) =>
    voteInfo?.users.some((user) => {
      const numberId = Number(user.id);
      return numberId === loggedInUserId;
    }) ?? false;

  const loggedInUserId = Number(loggedInUser?.id);

  const moviesForVoting = (
    <div className="flex gap-4 p-4  rounded-box w-full list-none">
      {movies.map((movie) => {
        const voteInfo = votesByMovie.find((vote) => vote.movieId === movie.id);
        const userVoted = didUserVote(voteInfo);
        const displayWinner = !voteInProgress && winner?.movieId === voteInfo?.movieId;
        return (
          <div
            key={movie.id}
            className={`flex flex-col items-center bg-base-100 p-3 rounded-2xl relative ${displayWinner && 'border border-info'}`}
          >
            <VoteMovieCard
              key={movie.id}
              movie={movie}
              layout={layout}
              VotingSessionProps={{
                status: voteSession.status,
                canVote: !!loggedInUser,
              }}
            />
            {/* VOTES */}
            {voteInProgress && (
              <button
                className=" btn btn-secondary cursor-pointer w-full rounded-2xl m-2 text-4xl"
                onClick={() => toggleVote(movie.id)}
              >
                {userVoted ? '-' : '+'}
              </button>
            )}

            <div className="flex flex-col gap-2 mt-6  w-full rounded-2xl justify-center items-center badge badge-soft p-2 h-fit">
              <div className="text-3xl badge badge-secondary p-4 badge-outline ">
                {voteInfo?.count ? voteInfo?.count : 0}
              </div>
              {voteInfo?.users.map((user) => (
                <div className="" key={user.id}>
                  <Image
                    src={`${user.image}`}
                    alt={''}
                    width={30}
                    height={30}
                    className="rounded-2xl h-auto w-auto "
                  />
                </div>
              ))}
            </div>
            {displayWinner && (
              <div className="absolute top-0 right-0 bg-info text-base-200 p-2 rounded-tr-xl">
                Winner
              </div>
            )}
          </div>
        );
      })}
    </div>
  );

  const carouselMovies = (
    <div className="relative w-64 sm:w-full max-w-6xl">
      {/* LEFT ARROW */}
      <button
        onClick={scrollLeft}
        className="hidden md:flex btn btn-circle absolute left-0 top-1/2 -translate-y-1/2 z-10"
      >
        ❮
      </button>

      {/* RIGHT ARROW */}
      <button
        onClick={scrollRight}
        className="hidden md:flex btn btn-circle absolute right-0 top-1/2 -translate-y-1/2 z-10"
      >
        ❯
      </button>

      {/* SCROLL CONTAINER */}
      <div
        ref={carouselRef}
        className=" flex gap-4 m-4 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide bg-neutral rounded-box justify-center"
      >
        {moviesForVoting}
      </div>
    </div>
  );

  const sessionDetail = (
    <div
      key={voteSession.id}
      className="list-row flex gap-4 items-center bg-base-300 p-2 rounded-2xl flex-col sm:flex-row"
    >
      <div className="w-full sm:w-fit text-center text-2xl sm:text-4xl font-thin opacity-30 tabular-nums sm:pr-4">
        <p>Movie Night {voteSession.id}</p>
      </div>
      <div>
        <Image
          src={`${createdBy.image}`}
          alt={'user-image'}
          width={30}
          height={30}
          className="rounded-2xl h-auto w-auto "
        />
      </div>

      <div className="list-col-grow">
        <div>{createdBy.name}</div>
        <div className="text-xs uppercase font-semibold opacity-60">
          {voteSession.movieNightDate.toDateString()}
        </div>
      </div>
      <div className="p-4 pb-2 text-xs opacity-60 tracking-wide">
        {voteSession.status === 'inProgress' ? (
          <div className="badge badge-info">Vote in Progress</div>
        ) : (
          <div className="badge badge-info">Completed</div>
        )}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col m-10 justify-center">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-6xl badge h-fit badge-secondary font-bold m-4 p-4  badge-outline text-center">
          {headerTitle}
        </h1>
        <div className="p-4">{sessionDetail}</div>
        <div className="flex justify-center items-center b">
          <div>{carouselMovies}</div>
        </div>
      </div>
      <button
        onClick={handleSubmitSessionFinalVote}
        disabled={!voteInProgress}
        className={`btn  p-10 ml-4 mr-4 text-2xl font-bold ${voteInProgress ? 'btn-secondary' : 'btn-info'}`}
      >
        {voteInProgress ? 'Close Voting' : 'Voting Over'}
      </button>

      {/* TO DO: ADD VOTE GRAPH */}
    </div>
  );
}
