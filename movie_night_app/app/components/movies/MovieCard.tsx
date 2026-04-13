'use client';

import { useRouter } from 'next/navigation';
import { WatchedMovieInsert } from '@/lib/types/db';
import { deleteMovieAction } from '@/lib/actions/deleteMovie';
import { MovieGridItem } from './MovieGridItem';
import { MovieCardProps } from '@/lib/types/ui';
import { MovieListItem } from './MovieListItem';
import { addWatchedMovieAction } from '@/lib/actions/addWatchedMovie';
import { messages } from '@/lib/config/messages';
import { handleActionToast } from '@/lib/utils/messageHandling/toastActionResult';

export default function MovieCard({
  movie,
  layout,
  index,
  onDeleted,
  onAdd,
  editMode,
}: MovieCardProps) {
  const router = useRouter();

  const handleDelete = async () => {
    const result = await deleteMovieAction(movie);

    const ok = handleActionToast(result, messages.success.movies.deleted);

    if (ok && onDeleted) {
      onDeleted(movie.id);
    }
  };

  const handleAddMovieToWatched = async () => {
    const watchedMovieData: WatchedMovieInsert = {
      movieId: movie.id,
      watchedOn: new Date().toISOString().slice(0, 10),
      chosenBy: null,
    };

    const result = await addWatchedMovieAction(watchedMovieData);
    const ok = handleActionToast(result, messages.success.watched_movies.added);

    if (ok && onAdd) {
      onAdd(movie.id);
      router.refresh();
    }
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
          editMode={editMode}
        />
      )}
      {layout === 'list' && <MovieListItem movie={movie} />}
    </li>
  );
}
