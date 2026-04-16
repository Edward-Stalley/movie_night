'use client';
/* eslint-disable react-hooks/set-state-in-effect */

import { useState } from 'react';
import { GridOrList } from '@/app/components/layout/GridOrList';
import { Layout, CreateVotingSessionLayoutProps } from '@/lib/types/ui';
import { SORT_OPTIONS_MOVIES } from '@/lib/config/sorts';
import { useRouter } from 'next/navigation';
import DateInput from '@/app/components/ui/DateInput';
import { createVotingSessionAction } from '@/lib/actions/createVotingSession';
import { getTodayLocal } from '@/lib/utils/date/getTodayLocal';
import VoteMovieCard from './VoteMovieCard';
import { useRef, useEffect } from 'react';
import { StoredMovie } from '@/lib/types/domain';
import { messages } from '@/lib/config/messages';
import { handleActionToast } from '@/lib/utils/messageHandling/toastActionResult';

export default function CreateVoteSessionLayout({
  movies,
  pagination,
  sortValue,
  sortOrder,
  loggedInUser,
}: CreateVotingSessionLayoutProps) {
  const [voteStarted] = useState<boolean>(true);
  const [selectedMovies, setSelectedMovies] = useState<StoredMovie[]>([]);
  const selectedIds = selectedMovies.map((m) => m.id);
  const [isHydrated, setIsHydrated] = useState(false);
  const [layout, setLayout] = useState<Layout>('grid');
  const headerTitle = 'Create Vote Session';
  const router = useRouter();
  const [movieNightDate, setMovieNightDate] = useState(getTodayLocal());
  const createdBy = Number(loggedInUser?.id);
  const canToggleLayout = false;
  const dateInputclassName = { input: 'h-10' };
  const carouselRef = useRef<HTMLDivElement>(null);
  const nonCarouselMovies = movies.filter((movie) => !selectedIds.includes(movie.id));
  const [isCreatingVote, setCreatingVote] = useState(false);

  //  SCROLL ARROW FUNCTIONS
  const scrollLeft = () => {
    carouselRef.current?.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = () => {
    carouselRef.current?.scrollBy({ left: 300, behavior: 'smooth' });
  };

  // CREATE
  const handleSubmitCreateVote = async (e: React.SubmitEvent) => {
    try {
      setCreatingVote(true);
      e.preventDefault();

      const result = await createVotingSessionAction({
        movieNightDate,
        movieIds: selectedIds,
        createdBy,
      });

      if (!handleActionToast(result, messages.success.votes_session.created)) {
        return;
      }

      localStorage.removeItem('selectedMovies');
      setSelectedMovies([]);
      router.replace(`/vote-session/sessions/${result.data}`);
    } finally {
      setCreatingVote(false);
    }
  };

  // ADD/REMOVE MOVIE FROM CAROUSEL
  const toggleSelect = (movie: StoredMovie) => {
    setSelectedMovies((prev) => {
      const exists = prev.some((m) => m.id === movie.id);

      if (exists) {
        return prev.filter((m) => m.id !== movie.id);
      }

      if (prev.length >= 8) return prev;

      return [...prev, movie];
    });
  };

  // CAROUSEL
  const carouselMovies = (
    <div className="relative w-11/12 sm:w-full max-w-6xl list-none">
      {/* LEFT ARROW */}
      {selectedMovies.length > 0 && (
        <button
          onClick={scrollLeft}
          className="w-8 h-8 md:flex btn btn-circle absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10"
        >
          ❮
        </button>
      )}

      {/* RIGHT ARROW */}
      {selectedMovies.length > 0 && (
        <button
          onClick={scrollRight}
          className="w-8 h-8 md:flex btn btn-circle absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10"
        >
          ❯
        </button>
      )}

      {/* SCROLL CONTAINER */}
      {selectedMovies.length > 0 && (
        <div
          ref={carouselRef}
          className=" flex gap-4 p-4 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide bg-base-100 rounded-box"
        >
          {selectedMovies.map((movie) => (
            <div key={movie.id} className="snap-start shrink-0 w-20">
              <div className="">
                <VoteMovieCard
                  movie={movie}
                  layout={layout}
                  CreateVotingSessionProps={{
                    selectable: voteStarted,
                    selected: selectedIds.includes(movie.id),
                    toggleSelect: () => toggleSelect(movie),
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const movieList = nonCarouselMovies.map((movie) => (
    <VoteMovieCard
      key={movie.id}
      movie={movie}
      layout={layout}
      CreateVotingSessionProps={{
        selectable: voteStarted,
        selected: selectedIds.includes(movie.id),
        toggleSelect: () => toggleSelect(movie),
      }}
    />
  ));

  //  SAVE SELECTED MOVIES TO LOCAL STORAGE
  //  SELECTED MOVIES PERSIST ON PAGE CHANGE

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;

    const saved = localStorage.getItem('selectedMovies');

    if (!saved) return;

    try {
      setSelectedMovies(JSON.parse(saved));
    } catch {
      localStorage.removeItem('selectedMovies');
    }
  }, [isHydrated]);

  useEffect(() => {
    if (!isHydrated) return;
    localStorage.setItem('selectedMovies', JSON.stringify(selectedMovies));
  }, [selectedMovies, isHydrated]);

  return (
    <div className="bg-base-200">
      {voteStarted && (
        <div className="flex rounded-2xl  justify-center bg-base-100 h-50 items-center m-4">
          {selectedMovies.length > 0 ? carouselMovies: <p className='text-sm'>Add Movies From List Below</p>}
        </div>
      )}
      <div className="flex justify-center items-center mt-4 gap-0 flex-col sm:flex-row">
        <div>
          <form className=" flex gap-2 rounded-2xl items-center" onSubmit={handleSubmitCreateVote}>
            {isCreatingVote ? (
              <div className="loading" />
            ) : (
              <>
                <DateInput
                  className={dateInputclassName}
                  date={movieNightDate}
                  onChange={setMovieNightDate}
                  min={getTodayLocal()}
                />

                <button className="btn btn-secondary rounded-xl h-9 ">Create</button>
              </>
            )}
          </form>
        </div>
      </div>
      {voteStarted && (
        <GridOrList
          layout={layout}
          setLayout={setLayout}
          headerTitle={headerTitle}
          pagination={pagination}
          sortValue={sortValue}
          sortOrder={sortOrder}
          sortOptions={SORT_OPTIONS_MOVIES}
          canToggleLayout={canToggleLayout}
          editMode={false}
          setEditMode={() => {}}
          displayEditToggle={false}
        >
          {movieList}
        </GridOrList>
      )}
    </div>
  );
}
