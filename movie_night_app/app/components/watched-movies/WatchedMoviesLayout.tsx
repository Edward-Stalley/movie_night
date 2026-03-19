'use client';

import WatchedMovieCard from '@/app/components/watched-movies/WatchedMovieCard';
import { useState } from 'react';
import { GridOrList } from '../layout/GridOrList';
import { Layout, WatchedMoviesLayoutProps } from '@/lib/types/ui';
import { SORT_OPTIONS_WATCHED_MOVIES } from '@/lib/config/sorts';

export default function WatchedMoviesLayout({
  movies,
  loggedInUser,
  users,
  pagination,
  sortValue,
  sortOrder,
}: WatchedMoviesLayoutProps) {
  const [layout, setLayout] = useState<Layout>('grid');
  const headerTitle = 'Watched Movies';
  const movieList = movies.map((movie) => {
    return (
      <WatchedMovieCard
        key={movie.tmdbId}
        movie={movie}
        layout={layout}
        loggedInUser={loggedInUser}
        users={users}
        isDetailScreen={false}
      />
    );
  });

  return (
    <div>
      <GridOrList
        layout={layout}
        setLayout={setLayout}
        headerTitle={headerTitle}
        pagination={pagination}
        sortValue={sortValue}
        sortOrder={sortOrder}
        sortOptions={SORT_OPTIONS_WATCHED_MOVIES}
      >
        {movieList}
      </GridOrList>
    </div>
  );
}
