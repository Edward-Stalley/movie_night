'use client';

import { useRouter } from 'next/navigation';
import { WatchedMovieInsert } from '@/lib/types/db';
import { deleteMovieFromMovies } from '@/lib/api/movies';
import { addMovieToWatched } from '@/lib/api/watched-movies';
import { MovieGridItem } from './MovieGridItem';
import { MovieCardProps } from '@/lib/types/ui';
import { MovieListItem } from './MovieListItem';

export default function MovieCard({ movie, layout }: MovieCardProps) {
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
    await addMovieToWatched(watchedMovieData);
    router.refresh();
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
        />
      )}

      {layout === 'list' && <MovieListItem movie={movie} />}
    </li>
  );
}
