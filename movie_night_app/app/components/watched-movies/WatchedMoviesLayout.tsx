'use client';

import WatchedMovieCard from '@/app/components/watched-movies/WatchedMovieCard';
import { useState } from 'react';
import { GridOrList } from '../layout/GridOrList';
import { WatchedMoviesLayoutProps } from '@/lib/types/ui';

export default function WatchedMoviesLayout({
  movies,
  loggedInUser,
  users,
}: WatchedMoviesLayoutProps) {
  const [layout, setLayout] = useState<'list' | 'grid'>('grid');
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
    <GridOrList layout={layout} setLayout={setLayout} headerTitle={headerTitle}>
      {movieList}
    </GridOrList>
  );
}
