'use client';

import { useEffect, useState } from 'react';
import { GridOrList } from '@/app/components/layout/GridOrList';
import { Layout, CreateVotingSessionLayoutProps } from '@/lib/types/ui';
import MovieCard from '@/app/components/movies/MovieCard';
import { SORT_OPTIONS_MOVIES } from '@/lib/config/sorts';
import { useRouter, useSearchParams } from 'next/navigation';
import DateInput from '@/app/components/ui/DateInput';
import { createVote } from '@/lib/actions/createVote';
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
  const [voteStarted, setVoteStarted] = useState<boolean>(true);
  const searchParams = useSearchParams();
  const initialSelected = searchParams.get('selected')
    ? searchParams.get('selected')!.split(',').map(Number)
    : [];

  const [selectedIds, setSelectedIds] = useState<number[]>(initialSelected);
  const [layout, setLayout] = useState<Layout>('grid');
  const headerTitle = 'Voting';
  const router = useRouter();
  const [movieNightDate, setMovieNightDate] = useState(getTodayLocal());
  const createdBy = Number(loggedInUser?.id);

  const handleSubmitCreateVote = async (e: React.SubmitEvent) => {
    e.preventDefault();

    const voteSessionId = await createVote({ movieNightDate, movieIds: selectedIds, createdBy });
    router.replace(`/vote-session/${voteSessionId}`);
    // router.refresh();
  };

  useEffect(() => {
    setSelectedIds(initialSelected);
  }, [searchParams]);

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
              onSelect: toggleSelect,
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
        onSelect: toggleSelect,
      }}
    />
  ));

  // Unique ClassName Object for DateInput
  const className = {
    input: 'h-10',
  };

  return (
    <div className="bg-base-300 flex justify-center items-center flex-col">
      {/* <p className="text-3xl p-10">{headerTitle}</p> */}
      <form className="flex gap-2 bg-primary p-2 rounded-2xl" onSubmit={handleSubmitCreateVote}>
        <DateInput
          className={className}
          date={movieNightDate}
          onChange={setMovieNightDate}
          min={getTodayLocal()}
        />
        <button className="btn btn-soft rounded-2xl">Create</button>
      </form>

      {voteStarted && <div className="flex flex-col rounded-2xl m-10">{carouselMovies}</div>}
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
