'use client';

import { useState } from 'react';
import MovieCard from '@/app/components/movies/MovieCard';
import { GridOrList } from '@/app/components/layout/GridOrList';
import { Layout, MoviesLayoutProps } from '@/lib/types/ui';
import { SORT_OPTIONS_MOVIES } from '@/lib/config/sorts';
import { useEffect } from 'react';

export default function MoviesLayout({
  movies,
  pagination,
  sortValue,
  sortOrder,
}: MoviesLayoutProps) {
  const [layout, setLayout] = useState<Layout>('grid');
  const headerTitle = 'Movies';

  const [movieListState, setMovieListState] = useState(movies);

  const handleDeleteMovie = (deletedId: number) => {
    setMovieListState((prev) => prev.filter((m) => m.id !== deletedId));
  };

  // This also removes the movie from Movies array. Adds it to Watched Movies.
  const handleAddMovieToWatched = (addedId: number) => {
    setMovieListState((prev) => prev.filter((m) => m.id !== addedId));
  };

  const [editMode, setEditMode] = useState<boolean>(false);
  const handleToggleEditMode = () => {
    setEditMode((prev) => !prev);
  };

  useEffect(() => {
    setMovieListState(movies);
  }, [movies]);

  const movieList = movieListState.map((movie, index) => (
    <MovieCard
      key={movie.id}
      movie={movie}
      layout={layout}
      index={index}
      editMode={editMode}
      onDeleted={handleDeleteMovie}
      onAdd={handleAddMovieToWatched}
    />
  ));

  return (
    <GridOrList
      layout={layout}
      setLayout={setLayout}
      headerTitle={headerTitle}
      pagination={pagination}
      sortValue={sortValue}
      sortOrder={sortOrder}
      sortOptions={SORT_OPTIONS_MOVIES}
      editMode={editMode}
      setEditMode={handleToggleEditMode}
      displayEditToggle={true}
    >
      {movieList}
    </GridOrList>
  );
}
