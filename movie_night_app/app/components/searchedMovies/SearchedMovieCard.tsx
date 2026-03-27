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
    const movieData: MovieInsert = {
      title: movie.title,
      tmdbId: movie.tmdbId, // <-- TMDB id maps to db tmdb_id
      posterPath: movie.posterPath,
      genreIds: movie.genreIds,
      overview: movie.overview,
      releaseDate: movie.releaseDate,
      addedBy: Number(loggedInUser?.id),
      trailerUrl: movie.trailerUrl,
      addedOn: new Date(),
    };

    await addSearchedMovieToMovies(movieData);
    router.refresh();
  };

  return (
    <li className="relative group">
      {layout === 'grid' && (
        <SearchedMovieGridItem
          id={movie.tmdbId}
          posterPath={movie.posterPath}
          title={movie.title}
          urlRoute="search-movie"
          onAdd={() => addToMovieList(movie)}
        />
      )}

      {layout === 'list' && <SearchedMovieListItem movie={movie} />}
    </li>
  );
}
