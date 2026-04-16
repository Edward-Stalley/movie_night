'use client';
import { WatchedMovieCardProps } from '@/lib/types/ui';
import { useRouter } from 'next/navigation';
import { WatchedMovieGridItem } from '@/app/components/watchedMovies/WatchedMovieGridItem';
import { WatchedMovieListItem } from '@/app/components/watchedMovies/WatchedMovieListItem';
import { deleteMovieFromWatchedAction } from '@/lib/actions/deleteWatchedMovie';
import { messages } from '@/lib/config/messages';
import { handleActionToast } from '@/lib/utils/messageHandling/toastActionResult';

export default function WatchedMovieCard({
  movie,
  loggedInUser,
  layout,
  users,
  isDetailScreen,
  onDeleted,
  editMode,
}: WatchedMovieCardProps) {
  const router = useRouter();

  const handleDelete = async () => {
    const result = await deleteMovieFromWatchedAction(movie);

    const ok = handleActionToast(result, messages.success.watched_movies.deleted);
    if (ok && onDeleted) {
      onDeleted(movie.id);
      router.refresh();
    }
  };

  return (
    <li className="relative group">
      {layout === 'grid' && (
        <WatchedMovieGridItem
          id={movie.movieId}
          posterPath={movie.posterPath}
          title={movie.title}
          urlRoute="watched-movies"
          onDelete={handleDelete}
          watchedOn={movie.watchedOn}
          chosenByName={movie.chosenByName}
          chosenByImage={movie.chosenByImage}
          editMode={editMode}
        />
      )}

      {layout === 'list' && (
        <WatchedMovieListItem
          movie={movie}
          users={users}
          loggedInUser={loggedInUser}
          onDelete={handleDelete}
          isDetailScreen={isDetailScreen}
          editMode={editMode}
        />
      )}
    </li>
  );
}
