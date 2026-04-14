'use client';

import { useState } from 'react';
import { Layout, VoteByMovie, VoteMoviesLayoutProps } from '@/lib/types/ui';
import VoteMovieCard from './VoteMovieCard';
import { VoteKey, WatchedMovieInsert } from '@/lib/types/db';
import { toggleVoteAction } from '@/lib/actions/toggleVoteAction';
import Image from 'next/image';
import { closeVotingSessionAction } from '@/lib/actions/closeVoting';
import { useRouter } from 'next/navigation';
import { addWatchedMovieAction } from '@/lib/actions/addWatchedMovie';
import { useRef } from 'react';
import { ArrowPathIcon } from '@heroicons/react/20/solid';
import { StoredMovie } from '@/lib/types/domain';
import TieBreakerVoteCard from './TieBreakerVoteCard';

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
  const [tieBreakerModalOpen, setTieBreakerModalOpen] = useState<boolean>(false);
  const [tieBreakerMovies, setTieBreakerMovies] = useState<StoredMovie[]>([]);
  const [tieBreakerWinnerId, setTieBreakerWinnerId] = useState<number | null>(null);

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

  const maxVotes = votesByMovie.length === 0 ? null : Math.max(...votesByMovie.map((m) => m.count));
  const tiebreakers = maxVotes === null ? null : votesByMovie.filter((m) => m.count === maxVotes);

  let winner: VoteByMovie | null;

  const handleFinalVote = async (movieId: number) => {
    setTieBreakerWinnerId(movieId);
    await closeVotingSessionAction(voteSession.id);

    const data: WatchedMovieInsert = {
      movieId: movieId,
      watchedOn: voteSession.movieNightDate.toLocaleDateString('en-CA'),
      chosenBy: createdBy.id,
    };

    setTieBreakerModalOpen(false);
    await addWatchedMovieAction(data);

    router.refresh();
  };

  const voteInProgress = voteSession.status === 'inProgress';
  const tieBreakerMovieList = tieBreakerMovies?.map((movie) => (
    <div className="w-40 shrink-0 snap-center" key={movie.id}>
      <TieBreakerVoteCard key={movie.id} movie={movie} finalVote={handleFinalVote} />
    </div>
  ));

  const handleSubmitSessionFinalVote = async () => {
    if (!tiebreakers) return; // safety guard

    // TIE BREAKER
    if (tiebreakers.length > 1) {
      setTieBreakerModalOpen(true);
      const tieMovieIds = tiebreakers.map((t) => t.movieId);
      setTieBreakerMovies(movies.filter((movie) => tieMovieIds.includes(movie.id)));
      return;
    }

    // FINAL PROCESS
    await closeVotingSessionAction(voteSession.id);

    const winner =
      votesByMovie.length === 0
        ? null
        : votesByMovie.reduce((currentWinner, movie) => {
            if (movie.count > currentWinner.count) {
              return movie;
            }
            return currentWinner;
          });

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
        const computedWinner =
          tieBreakerWinnerId ??
          (votesByMovie.length === 0
            ? null
            : votesByMovie.reduce((currentWinner, movie) => {
                if (movie.count > currentWinner.count) return movie;
                return currentWinner;
              }).movieId);

        const displayWinner = !voteInProgress && computedWinner === movie.id;

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
    <div className="relative w-86 sm:w-full md:w-full max-w-6xl">
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

  const carouselTieBreakerMovies = (
    <div className="relative w-full  sm:w-full md:w-full max-w-full list-none">
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
        className="flex justify-start gap-4 m-4 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide bg-neutral rounded-box scroll-pl-4"
      >
        {tieBreakerMovieList}
      </div>
    </div>
  );

  const sessionDetail = (
    <div
      key={voteSession.id}
      className="list-row flex justify-center gap-4 items-center bg-neutral pt-2 pb-2 mt-4 mb-4 rounded-2xl flex-col sm:flex-row"
    >
      <div className="w-full sm:w-fit text-center text-2xl sm:text-4xl font-thin opacity-30 tabular-nums sm:pr-4">
        <p>Movie Night {voteSession.id}</p>
      </div>
      <div className="flex">
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

        <div className="p-1 text-xs opacity-60 tracking-wide flex pl-2 items-center">
          {voteSession.status === 'inProgress' ? (
            <div className="badge badge-info">In Progress</div>
          ) : (
            <div className="badge badge-info">Completed</div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col m-2 justify-center">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-6xl badge h-fit badge-secondary font-bold badge-outline text-center">
          {headerTitle}
        </h1>
        <div className="w-full">{sessionDetail}</div>
        <button className="btn btn-soft btn-primary ml-4 mr-4" onClick={() => router.refresh()}>
          <ArrowPathIcon className="h-5 w-5" />
        </button>
        <div className="flex justify-center items-center">
          <div>{carouselMovies}</div>
        </div>
      </div>
      <button
        onClick={handleSubmitSessionFinalVote}
        disabled={!voteInProgress}
        className={`btn btn-soft border border-secondary  p-2 ml-4 mr-4 text-2xl font-bold ${voteInProgress ? 'btn-secondary' : 'btn-info'}`}
      >
        {voteInProgress ? 'Close Voting' : 'Voting Over'}
      </button>
      {/* TO DO: ADD VOTE GRAPH */}

      {/* TIEBREAKER */}
      {tieBreakerModalOpen && (
        <dialog className="modal modal-open">
          <div className="modal-box max-w-3xl w-full overflow-hidden">
            <h3 className="font-bold text-2xl">Uh Oh! It's a tie 🤝</h3>
            {loggedInUser?.id == createdBy.id && (
              <div>
                <p className="py-4">You get the final vote!</p>
                <div className="">{carouselTieBreakerMovies}</div>
              </div>
            )}
            {loggedInUser?.id != createdBy.id && (
              <div>
                <p className="py-4">Wait a sec. {createdBy.name} is choosing.</p>
              </div>
            )}

            <div className="modal-action">
              <button className="btn" onClick={() => setTieBreakerModalOpen(false)}>
                Cancel
              </button>
            </div>
          </div>

          {/* backdrop click closes */}
          <form method="dialog" className="modal-backdrop">
            <button onClick={() => setTieBreakerModalOpen(false)}>close</button>
          </form>
        </dialog>
      )}
    </div>
  );
}
