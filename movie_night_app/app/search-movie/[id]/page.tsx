import SearchedMovieCard from '@/app/components/searchedMovies/SearchedMovieCard';
import { getSearchedMovieDetails } from '@/lib/external/tmdb';
import { toSearchedMovie } from '@/lib/transform';

export default async function MovieDetail({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;

  const numericId = Number(id);
  const data = await getSearchedMovieDetails(numericId);

  if (!data) {
    return <div>Movie Not Found</div>;
  }

  const movie = toSearchedMovie(data);

  return (
    <div>
      <SearchedMovieCard movie={movie} key={movie.tmdbId} layout="list" isDetailScreen={true} />
    </div>
  );
}
