'use client';

import { useRouter } from 'next/navigation';
import { WatchedMovieInsert } from '@/lib/types/db';
import { deleteMovieFromMovies } from '@/lib/api/movies';
import { MovieGridItem } from './MovieGridItem';
import { MovieCardProps } from '@/lib/types/ui';
import { MovieListItem } from './MovieListItem';
import { addWatchedMovieAction } from '@/lib/actions/addWatchedMovie';
import { messages } from '@/lib/config/messages';
import { handleActionToast } from '@/lib/utils/messageHandling/toastActionResult';

export default function MovieCard({ movie, layout, index }: MovieCardProps) {
  const router = useRouter();
  const handleDelete = async () => {
    await deleteMovieFromMovies(movie);
    router.refresh();
  };

  const handleAddMovieToWatched = async () => {
    const watchedMovieData: WatchedMovieInsert = {
      movieId: movie.id,
      watchedOn: new Date().toISOString().slice(0, 10),
      chosenBy: null,
    };

    const result = await addWatchedMovieAction(watchedMovieData);

    if (!handleActionToast(result, messages.success.watched_movies.added)) router.refresh();
  };

  return (
    <li className="relative group">
      {layout === 'grid' && (
        <MovieGridItem
          id={movie.id}
          posterPath={movie.posterPath}
          title={movie.title}
          urlRoute="movies"
          onDelete={handleDelete}
          onAdd={handleAddMovieToWatched}
          index={index}
        />
      )}

      {layout === 'list' && <MovieListItem movie={movie} />}
    </li>
  );
}
