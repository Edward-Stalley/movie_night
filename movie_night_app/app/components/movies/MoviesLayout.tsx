'use client';

import { useState } from 'react';
import MovieCard from '@/app/components/movies/MovieCard';
import { GridOrList } from '@/app/components/layout/GridOrList';
import { Layout, MoviesLayoutProps } from '@/lib/types/ui';

export default function MoviesLayout({ movies }: MoviesLayoutProps) {
  const [layout, setLayout] = useState<Layout>('grid');
  const headerTitle = 'Movies';

  const movieList = movies.map((movie) => (
    <MovieCard key={movie.id} movie={movie} layout={layout} />
  ));

  return (
    <GridOrList layout={layout} setLayout={setLayout} headerTitle={headerTitle}>
      {movieList}
    </GridOrList>
  );
}
