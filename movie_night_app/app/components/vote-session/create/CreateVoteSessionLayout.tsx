'use client';

import { useState } from 'react';
import { GridOrList } from '@/app/components/layout/GridOrList';
import { Layout, CreateVotingSessionLayoutProps } from '@/lib/types/ui';
import { SORT_OPTIONS_MOVIES } from '@/lib/config/sorts';
import { useRouter, useSearchParams } from 'next/navigation';
import DateInput from '@/app/components/ui/DateInput';
import { createVotingSessionAction } from '@/lib/actions/createVotingSession';
import { getTodayLocal } from '@/lib/utils/date/getTodayLocal';
import VoteMovieCard from './VoteMovieCard';

export default function CreateVoteSessionLayout({
  movies,
  pagination,
  sortValue,
  sortOrder,
  selectedMovies,
  loggedInUser,
}: CreateVotingSessionLayoutProps) {
  const [voteStarted] = useState<boolean>(true);
  const searchParams = useSearchParams();
  const initialSelected = searchParams.get('selected')
    ? searchParams.get('selected')!.split(',').map(Number)
    : [];

  const [selectedIds, setSelectedIds] = useState<number[]>(initialSelected);
  const [layout, setLayout] = useState<Layout>('grid');
  const headerTitle = 'Create Vote Session';
  const router = useRouter();
  const [movieNightDate, setMovieNightDate] = useState(getTodayLocal());
  const createdBy = Number(loggedInUser?.id);

  const handleSubmitCreateVote = async (e: React.SubmitEvent) => {
    e.preventDefault();

    const voteSessionId = await createVotingSessionAction({
      movieNightDate,
      movieIds: selectedIds,
      createdBy,
    });
    router.replace(`/vote-session/sessions/${voteSessionId}`);
  };

  const toggleSelect = (id: number) => {
    const current = searchParams.get('selected')
      ? searchParams.get('selected')!.split(',').map(Number)
      : [];

    let updated;

    if (current.includes(id)) {
      updated = current.filter((m) => m !== id);
    } else {
      if (current.length >= 8) return;
      updated = [...current, id];
    }

    setSelectedIds(updated);

    const params = new URLSearchParams(searchParams.toString());
    params.set('selected', updated.join(','));

    router.replace(`?${params.toString()}`);
  };

  // VOTING
  const selectedMoviesList = selectedMovies;

  const carouselMovies = (
    <div className="carousel carousel-center gap-4 p-4 bg-base-100 rounded-box w-full">
      {selectedMoviesList.map((movie) => (
        <div key={movie.id} className="carousel-item w-32">
          <VoteMovieCard
            key={movie.id}
            movie={movie}
            layout={layout}
            CreateVotingSessionProps={{
              selectable: voteStarted,
              selected: selectedIds.includes(movie.id),
              toggleSelect: toggleSelect,
            }}
          />
        </div>
      ))}
    </div>
  );

  const nonCarouselMovies = movies.filter((movie) => !selectedIds.includes(movie.id));

  const movieList = nonCarouselMovies.map((movie) => (
    <VoteMovieCard
      key={movie.id}
      movie={movie}
      layout={layout}
      CreateVotingSessionProps={{
        selectable: voteStarted,
        selected: selectedIds.includes(movie.id),
        toggleSelect: toggleSelect,
      }}
    />
  ));

  // Unique ClassName Object for DateInput
  const className = {
    input: 'h-10',
  };

  return (
    <div className="bg-base-300 flex justify-center items-center flex-col">
      <p className="text-3xl p-10 badge badge-secondary badge-soft">{headerTitle}</p>

      {voteStarted && <div className="flex rounded-2xl m-2">{carouselMovies}</div>}
      <form
        className="flex gap-2  p-2 rounded-2xl badge badge-soft badge-secondary h-fit"
        onSubmit={handleSubmitCreateVote}
      >
        <DateInput
          className={className}
          date={movieNightDate}
          onChange={setMovieNightDate}
          min={getTodayLocal()}
        />
        <button className="btn btn-secondary rounded-xl h-8">Create</button>
      </form>

      {voteStarted && (
        <GridOrList
          layout={layout}
          setLayout={setLayout}
          headerTitle={headerTitle}
          pagination={pagination}
          sortValue={sortValue}
          sortOrder={sortOrder}
          sortOptions={SORT_OPTIONS_MOVIES}
        >
          {movieList}
        </GridOrList>
      )}
    </div>
  );
}
