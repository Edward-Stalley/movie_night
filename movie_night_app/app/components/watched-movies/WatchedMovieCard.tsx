'use client';
import { WatchedMovieCardProps } from '@/lib/types/ui';
import { deleteMovieFromWatched } from '@/lib/api/watched-movies';
import { useRouter } from 'next/navigation';
import { MovieGridItem } from '@/app/components/shared/MovieGridItem';
import { WatchedMovieListItem } from '@/app/components/watched-movies/WatchedMovieListItem';

export default function WatchedMovieCard({
  movie,
  loggedInUser,
  layout,
  users,
  isDetailScreen,
}: WatchedMovieCardProps) {
  const router = useRouter();

  const handleDelete = async () => {
    await deleteMovieFromWatched(movie);
    router.push('/watched-movies');
  };

  return (
    <li className="relative group">
      {layout === 'grid' && (
        <MovieGridItem
          id={movie.movieId}
          posterPath={movie.posterPath}
          originalTitle={movie.originalTitle}
          urlRoute="watched-movies"
          onDelete={handleDelete}
        />
      )}

      {layout === 'list' && (
        <WatchedMovieListItem
          movie={movie}
          users={users}
          loggedInUser={loggedInUser}
          onDelete={handleDelete}
          isDetailScreen={isDetailScreen}
        />
      )}
    </li>
  );
}
