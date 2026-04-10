'use client';

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

  //  SCROLL ARROW FUNCTIONS
  const scrollLeft = () => {
    carouselRef.current?.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = () => {
    carouselRef.current?.scrollBy({ left: 300, behavior: 'smooth' });
  };

  // CREATE
  const handleSubmitCreateVote = async (e: React.SubmitEvent) => {
    e.preventDefault();

    const voteSessionId = await createVotingSessionAction({
      movieNightDate,
      movieIds: selectedIds,
      createdBy,
    });

    localStorage.removeItem('selectedMovies');
    setSelectedMovies([]);
    router.replace(`/vote-session/sessions/${voteSessionId}`);
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
    <div className="relative w-64 sm:w-full max-w-6xl list-none">
      {/* LEFT ARROW */}
      {selectedMovies.length > 0 && (
        <button
          onClick={scrollLeft}
          className="hidden md:flex btn btn-circle absolute left-0 top-1/2 -translate-y-1/2 z-10"
        >
          ❮
        </button>
      )}

      {/* RIGHT ARROW */}
      {selectedMovies.length > 0 && (
        <button
          onClick={scrollRight}
          className="hidden md:flex btn btn-circle absolute right-0 top-1/2 -translate-y-1/2 z-10"
        >
          ❯
        </button>
      )}

      {/* SCROLL CONTAINER */}
      <div
        ref={carouselRef}
        className="
        flex gap-4 p-4 
        overflow-x-auto scroll-smooth
        snap-x snap-mandatory
        scrollbar-hide
        bg-base-100 rounded-box
      "
      >
        {selectedMovies.map((movie) => (
          <div key={movie.id} className="snap-start shrink-0 w-36">
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
        ))}
      </div>
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
  // SELECTED MOVIES PERSIST ON PAGE CHANGE
  useEffect(() => {
    const saved = localStorage.getItem('selectedMovies');
    if (saved) {
      try {
        setSelectedMovies(JSON.parse(saved));
      } catch {
        localStorage.removeItem('selectedMovies');
      }
    }
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    localStorage.setItem('selectedMovies', JSON.stringify(selectedMovies));
  }, [selectedMovies, isHydrated]);

  return (
    <div className="bg-base-200 flex justify-center items-center flex-col">
      {voteStarted && <div className="flex rounded-2xl m-2">{carouselMovies}</div>}
      <div className="flex justify-center items-center badge badge-soft h-fit gap-0 flex-col sm:flex-row">
        <div className="pt-2 sm:pt-0">
          <p className="text-xl badge badge-secondary badge-soft ">{headerTitle}</p>
        </div>
        <div>
          <form
            className=" flex gap-2 p-2 rounded-2xl badge badge-soft badge-secondary h-14 m-2"
            onSubmit={handleSubmitCreateVote}
          >
            <DateInput
              className={dateInputclassName}
              date={movieNightDate}
              onChange={setMovieNightDate}
              min={getTodayLocal()}
            />
            <button className="btn btn-secondary rounded-xl h-8">Create</button>
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
        >
          {movieList}
        </GridOrList>
      )}
    </div>
  );
}
