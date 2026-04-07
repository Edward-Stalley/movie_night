import SearchedMovieCard from '@/app/components/searchedMovies/SearchedMovieCard';
import { getSearchedMovieDetails } from '@/lib/external/tmdb';
import { toSearchedMovie } from '@/lib/transform';
import { notFound } from 'next/navigation';

export default async function SearchMovieDetailContent({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const numericId = Number(id);

  const data = await getSearchedMovieDetails(numericId);

  if (!data) return <div>Movie Not Found</div>;
  const movie = toSearchedMovie(data);

  return <SearchedMovieCard movie={movie} key={movie.tmdbId} layout="list" isDetailScreen={true} />;
}
