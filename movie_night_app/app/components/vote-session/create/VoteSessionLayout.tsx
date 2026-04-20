'use client';

import { useCallback, useEffect, useMemo, useState, useTransition } from 'react';
import { Layout, VoteByMovie, VoteMoviesLayoutProps } from '@/lib/types/ui';
import VoteMovieCard from './VoteMovieCard';
import { VoteKey, WatchedMovieInsert } from '@/lib/types/db';
import { toggleVoteAction } from '@/lib/actions/toggleVoteAction';
import Image from 'next/image';
import { closeVotingSessionAction } from '@/lib/actions/closeVoting';
import { useRouter } from 'next/navigation';
import { addWatchedMovieAction } from '@/lib/actions/addWatchedMovie';
import { useRef } from 'react';
import {
  ArrowPathIcon,
  LockClosedIcon,
  LockOpenIcon,
  MinusCircleIcon,
  PlusCircleIcon,
} from '@heroicons/react/20/solid';
import TieBreakerVoteCard from './TieBreakerVoteCard';
import { useSessionPolling } from '@/lib/hooks/useSessionPolling';
import { startTieBreakerAction } from '@/lib/actions/startTieBreakerAction';

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
  const [pendingVoteMovieId, setPendingVoteMovieId] = useState<number | null>(null);
  const [isClosingVoting, setIsClosingVoting] = useState(false);
  const [optimisticStatus, setOptimisticStatus] = useState(voteSession.status);
  const effectiveStatus = optimisticStatus ?? voteSession.status;
  const votingOpen = effectiveStatus === 'inProgress';
  const refresh = useCallback(() => router.refresh(), [router]);
  const [isPending, setTransition] = useTransition();

  useSessionPolling({
    status: effectiveStatus,
    refresh,
  });

  useEffect(() => {
    setOptimisticStatus(voteSession.status);
  }, [voteSession.status]);

  const carouselRef = useRef<HTMLDivElement>(null);
  const tieBreakerCarouselRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    carouselRef.current?.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = () => {
    carouselRef.current?.scrollBy({ left: 300, behavior: 'smooth' });
  };

  const scrollTieLeft = () => {
    tieBreakerCarouselRef.current?.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollTieRight = () => {
    tieBreakerCarouselRef.current?.scrollBy({ left: 300, behavior: 'smooth' });
  };

  const toggleVote = async (id: number) => {
    if (!votingOpen) {
      alert('Voting Closed');
      return;
    }
    if (!loggedInUser) {
      alert('Please Login to Vote!');
      return;
    }

    const vote: VoteKey = {
      voteSessionId: voteSession.id,
      movieId: id,
      userId: Number(loggedInUser.id),
    };

    setPendingVoteMovieId(id);
    try {
      await toggleVoteAction(vote);
      router.refresh();
    } catch {
      alert('Voting Closed.');
      router.refresh();
    } finally {
      setPendingVoteMovieId(null);
    }
  };

  const maxVotes = votesByMovie.length > 0 ? Math.max(...votesByMovie.map((m) => m.count)) : 0;
  const tiebreakers = votesByMovie.filter((m) => m.count === maxVotes);

  const finalizeSessionWithWinner = async (movieId: number | null) => {
    await closeVotingSessionAction(voteSession.id, movieId);

    if (!movieId) {
      router.refresh();
      return;
    }

    const data: WatchedMovieInsert = {
      movieId,
      watchedOn: voteSession.movieNightDate.toLocaleDateString('en-CA'),
      chosenBy: createdBy.id,
    };

    await addWatchedMovieAction(data);
    router.refresh();
  };

  // FINAL VOTE AFTER TIEBREAKER
  const handleFinalVote = async (movieId: number) => {
    setOptimisticStatus('completed');
    finalizeSessionWithWinner(movieId);
  };
  const voteInProgress = effectiveStatus === 'inProgress';
  const tieBreakerMovies = useMemo(() => {
    if (effectiveStatus !== 'tieBreaker') return [];
    const tieMovieIds = tiebreakers.map((t) => t.movieId);
    return movies.filter((m) => tieMovieIds.includes(m.id));
  }, [effectiveStatus, tiebreakers, movies]);

  const tieBreakerMovieList = tieBreakerMovies.map((movie) => (
    <div className="w-40 shrink-0 " key={movie.id}>
      <TieBreakerVoteCard key={movie.id} movie={movie} finalVote={handleFinalVote} />
    </div>
  ));

  // FINAL VOTE

  const handleSubmitSessionFinalVote = async () => {
    setIsClosingVoting(true);

    try {
      // TIE BREAKER
      if (tiebreakers.length > 1) {
        setOptimisticStatus('tieBreaker');
        await startTieBreakerAction(voteSession.id);
        setIsClosingVoting(false);
        return;
      }

      // FINAL PROCESS
      const winner = votesByMovie.reduce<VoteByMovie | null>((highestVote, movie) => {
        if (!highestVote || movie.count > highestVote.count) return movie;
        return highestVote;
      }, null);

      if (!winner) {
        setOptimisticStatus('completed');
        finalizeSessionWithWinner(null);
        return;
      }
      setOptimisticStatus('completed');
      finalizeSessionWithWinner(winner.movieId);
    } finally {
      setIsClosingVoting(false);
    }
  };

  const didUserVote = (voteInfo?: { users: { id: string }[] }) =>
    voteInfo?.users.some((user) => {
      const numberId = Number(user.id);
      return numberId === loggedInUserId;
    }) ?? false;

  const loggedInUserId = Number(loggedInUser?.id);
  const voteMap = useMemo(() => new Map(votesByMovie.map((v) => [v.movieId, v])), [votesByMovie]);

  const moviesForVoting = (
    <div className="flex gap-2 p-4 rounded-box list-none">
      {movies.map((movie) => {
        const voteInfo = voteMap.get(movie.id);
        const userVoted = didUserVote(voteInfo);

        const displayWinner = !voteInProgress && voteSession.winningMovieId === movie.id;
        //voting
        const isThisMoviePending = pendingVoteMovieId === movie.id;

        return (
          <div
            key={movie.id}
            className={`flex flex-col items-center bg-base-300 p-3 rounded-2xl relative ${displayWinner && 'border border-info'}`}
          >
            <div key={movie.id} className=" shrink-0 w-36">
              <VoteMovieCard
                key={movie.id}
                movie={movie}
                layout={layout}
                VotingSessionProps={{
                  status: effectiveStatus,
                  canVote: !!loggedInUser,
                }}
              />
            </div>
            {/* VOTES */}
            {voteInProgress && (
              <button
                disabled={isThisMoviePending}
                className={`${userVoted ? ' btn-secondary ' : 'btn-primary'} btn btn-soft cursor-pointer w-full m-2 text-4xl`}
                onClick={() => toggleVote(movie.id)}
              >
                {isThisMoviePending ? (
                  <span className="loading loading-spinner"></span>
                ) : userVoted ? (
                  <MinusCircleIcon className="h-5 w-5" />
                ) : (
                  <PlusCircleIcon className="h-5 w-5" />
                )}
              </button>
            )}

            <div className="flex flex-col gap-2 mt-2 h-full w-full rounded-2xl justify-start items-center badge badge-soft p-2">
              <div className="text-3xl badge badge-secondary p-4 badge-outline">
                {voteInfo?.count ?? 0}
              </div>
              <div className=" flex gap-1 w-full overflow-scroll">
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
    <div className="relative w-full sm:w-full md:w-full max-w-6xl ">
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
        className=" flex overflow-x-auto scroll-smooth  scrollbar-hide bg-base-100 rounded-box rounded-b-none justify-start "
      >
        {moviesForVoting}
      </div>
    </div>
  );

  const carouselTieBreakerMovies = (
    <div className="relative w-full sm:w-full md:w-full max-w-full list-none">
      {/* LEFT ARROW */}
      <button
        onClick={scrollTieLeft}
        className="hidden md:flex btn btn-circle absolute left-0 top-1/2 -translate-y-1/2 z-10"
      >
        ❮
      </button>

      {/* RIGHT ARROW */}
      <button
        onClick={scrollTieRight}
        className="hidden md:flex btn btn-circle absolute right-0 top-1/2 -translate-y-1/2 z-10"
      >
        ❯
      </button>

      {/* SCROLL CONTAINER */}
      <div
        ref={tieBreakerCarouselRef}
        className="flex justify-start gap-4 m-4  overflow-x-auto scroll-smooth scrollbar-hide py-2 rounded-box scroll-pl-4   "
      >
        {tieBreakerMovieList}
      </div>
    </div>
  );

  const sessionDetail = (
    <div
      key={voteSession.id}
      className=" pt-10 list-row flex justify-center gap-2 items-center flex-col sm:flex-row bg-base-200"
    >
      <div className="flex w-full justify-center gap-4">
        <div className="flex gap-2">
          <Image
            src={`${createdBy.image}`}
            alt={'user-image'}
            width={36}
            height={36}
            className="rounded-2xl h-auto w-auto "
          />
          <div className="list-col-grow">
            <div>{createdBy.name}</div>
            <div className="text-xs uppercase font-semibold opacity-60">
              {voteSession.movieNightDate.toDateString()}
            </div>
          </div>
        </div>

        <div className=" text-xs opacity-60 tracking-wide flex pl-2 items-center">
          {effectiveStatus === 'inProgress' ? (
            <div className="badge badge-info">In Progress</div>
          ) : (
            <div className="badge badge-info">Completed</div>
          )}
        </div>
      </div>
      <div className="sm:w-fit text-xl sm:text-4xl font-thin opacity-30 sm:pr-4 flex justify-center w-full">
        {/* <p>Movie Night {voteSession.id}</p> */}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col bg-base-200 pb-5 flex-1 ">
      <div className="w-full">{sessionDetail}</div>
      <div className="flex justify-center border-secondary border-t border-b my-6 py-2">
        <h1 className="text-xl badge h-fit badge-secondary font-bold badge-outline text-center bg-base-300 ">
          {headerTitle}
        </h1>
      </div>

      <div className="flex flex-col flex-1 justify-between">
        <div className="flex justify-center items-center w-full bg-base-200 px-4 ">
          <div className="flex p-2 w-full justify-center">
            {isClosingVoting ? <div className="loading"></div> : carouselMovies}
          </div>
        </div>

        <div className="flex justify-center items-center w-full gap-4">
          <button
            className="btn btn-soft rounded-xl w-fit"
            disabled={!voteInProgress}
            onClick={() =>
              setTransition(() => {
                router.refresh();
              })
            }
          >
            {isPending ? <div className="loading "></div> : <ArrowPathIcon className="h-5 w-5" />}
            <p>Refresh</p>
          </button>
          <div className="flex items-center justify-center">
            <button
              onClick={handleSubmitSessionFinalVote}
              disabled={loggedInUser?.id != createdBy.id || !voteInProgress || isClosingVoting}
              className={` text-xs btn btn-soft w-fit border p-2 text-md rounded-xl ${voteInProgress ? 'btn' : 'btn-info'}`}
            >
              {isClosingVoting ? (
                <span className="loading loading-spinner"></span>
              ) : voteInProgress ? (
                <>
                  <LockOpenIcon className="h-5 w-5" />
                  <p>Close Voting</p>
                </>
              ) : (
                <>
                  <LockClosedIcon className="h-5 w-5" />
                  <p>Voting Over</p>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* TO DO: ADD VOTE GRAPH */}
      {/* TIEBREAKER */}
      {effectiveStatus == 'tieBreaker' && (
        <dialog className="modal modal-open p-4 ">
          <div className="modal-box max-w-3xl w-full overflow-hidden bg-base-100 justify-center">
            <h3 className="font-bold text-2xl text-center">{`Uh Oh! It's a tie.`}</h3>
            {loggedInUser?.id == createdBy.id && (
              <div>
                <p className="py-4 flex justify-center">You get the final vote!</p>
                <div className="">{carouselTieBreakerMovies}</div>
              </div>
            )}
            {loggedInUser?.id != createdBy.id && (
              <div className="flex justify-center">
                <p className="py-4">Please wait a second. {createdBy.name} is choosing.</p>
              </div>
            )}

            <div className="modal-action"></div>
          </div>

          {/* backdrop click closes */}
          <form method="dialog" className="modal-backdrop"></form>
        </dialog>
      )}
    </div>
  );
}
