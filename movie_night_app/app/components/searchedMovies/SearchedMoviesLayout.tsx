'use client';

import { useEffect, useState } from 'react';
import { GridOrList } from '@/app/components/layout/GridOrList';
import { Layout, SearchedMoviesLayoutProps } from '@/lib/types/ui';
import { SORT_OPTIONS_SEARCHED_MOVIES } from '@/lib/config/sorts';
import SearchedMovieCard from './SearchedMovieCard';
import Searchbar from '@/app/components/searchedMovies/Searchbar';
import { useSearchParams } from 'next/navigation';

export default function SearchedMoviesLayout({
  movies,
  pagination,
  sortValue,
  sortOrder,
  emptyState,
  loggedInUser,
}: SearchedMoviesLayoutProps) {
  const [layout, setLayout] = useState<Layout>('grid');
  const headerTitle = 'Search Results';
  const searchParams = useSearchParams();
  const queryFromUrl = searchParams.get('query') ?? '';
  const [movieTitle, setMovieTitle] = useState(queryFromUrl);

  useEffect(() => {
    setMovieTitle(queryFromUrl);
  }, [queryFromUrl]);

  const [editMode, setEditMode] = useState<boolean>(false);
  const handleToggleEditMode = () => {
    setEditMode((prev) => !prev);
  };

  const movieList = movies.map((movie) => (
    <SearchedMovieCard
      key={movie.tmdbId}
      movie={movie}
      layout={layout}
      isDetailScreen={false}
      loggedInUser={loggedInUser}
      editMode={editMode}
    />
  ));

  return (
    <>
      
      <Searchbar movieTitle={movieTitle} setMovieTitle={setMovieTitle} />

      {!emptyState && (
        <GridOrList
          layout={layout}
          setLayout={setLayout}
          headerTitle={headerTitle}
          pagination={pagination}
          sortValue={sortValue}
          sortOrder={sortOrder}
          sortOptions={SORT_OPTIONS_SEARCHED_MOVIES}
          editMode={editMode}
          setEditMode={handleToggleEditMode}
          displayEditToggle={false}
        >
          {movieList}
        </GridOrList>
      )}
    </>
  );
}
