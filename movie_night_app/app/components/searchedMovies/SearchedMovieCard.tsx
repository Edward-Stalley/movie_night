'use client';

import { useRouter } from 'next/navigation';
import { addSearchedMovieToMovies } from '@/lib/api/movies';
import { SearchedMovieGridItem } from '@/app/components/searchedMovies/SearchedMovieGridItem';
import { SearchedMovieCardProps } from '@/lib/types/ui';
import { SearchedMovie } from '@/lib/types/domain';
import { SearchedMovieListItem } from './SearchedMovieListItem';
import { MovieInsert } from '@/lib/types/db';
import { handleActionToast } from '@/lib/utils/messageHandling/toastActionResult';
import { messages } from '@/lib/config/messages';
import { addSearchedMovieToMoviesAction } from '@/lib/actions/addSearchedMovieToMovies';

export default function SearchedMovieCard({ movie, layout, loggedInUser }: SearchedMovieCardProps) {
  const router = useRouter();

  const addToMovieList = async (movie: SearchedMovie) => {
    const result = await addSearchedMovieToMoviesAction(movie, Number(loggedInUser?.id));

    if (!handleActionToast(result, messages.success.movies.added)) router.refresh();
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
