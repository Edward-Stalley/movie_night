'use client';

import { useRouter } from 'next/navigation';
import { MovieInsert } from '@/lib/types/db';
import { addSearchedMovieToMovies } from '@/lib/api/movies';
import { SearchedMovieGridItem } from '@/app/components/searchedMovies/SearchedMovieGridItem';
import { SearchedMovieCardProps } from '@/lib/types/ui';
import { SearchedMovie } from '@/lib/types/domain';
import { SearchedMovieListItem } from './SearchedMovieListItem';

export default function SearchedMovieCard({ movie, layout, loggedInUser }: SearchedMovieCardProps) {
  const router = useRouter();

  const addToMovieList = async (movie: SearchedMovie) => {
    await addSearchedMovieToMovies(movie);
    router.refresh();
  };

  return (
    <li className="relative group">
      {layout === 'grid' && (
        <SearchedMovieGridItem
          movie={movie}
          urlRoute="search-movie"
          onAdd={() => addToMovieList(movie)}
        />
      )}

      {layout === 'list' && <SearchedMovieListItem movie={movie} />}
    </li>
  );
}
