'use client';

import WatchedMovieCard from '@/app/components/watchedMovies/WatchedMovieCard';
import { useEffect, useState } from 'react';
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
  const [watchedMovieListState, setWatchedMovieListState] = useState(movies);

  const handleDeleteWatchedMovie = (deletedId: number) => {
    setWatchedMovieListState((prev) => prev.filter((m) => m.id !== deletedId));
  };

  useEffect(() => {
    setWatchedMovieListState(movies);
  }, [movies]);

  const [editMode, setEditMode] = useState<boolean>(false);
  const handleToggleEditMode = () => {
    setEditMode((prev) => !prev);
  };

  const movieList = watchedMovieListState.map((movie) => {
    return (
      <WatchedMovieCard
        key={movie.id}
        movie={movie}
        layout={layout}
        loggedInUser={loggedInUser}
        users={users}
        isDetailScreen={false}
        onDeleted={handleDeleteWatchedMovie}
        editMode={editMode}
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
        editMode={editMode}
        setEditMode={handleToggleEditMode}
        displayEditToggle={true}
      >
        {movieList}
      </GridOrList>
    </div>
  );
}
