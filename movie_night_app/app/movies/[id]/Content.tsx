import MovieCard from '@/app/components/movies/MovieCard';
import { getMovie } from '@/lib/queries/movies';
import { toStoredMovies } from '@/lib/transform';

export default async function MovieDetailContent({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const numericId = Number(id);

  const data = await getMovie(numericId);

  if (!data) return <div>Movie Not Found</div>;
  const movie = toStoredMovies(data);

  return <MovieCard movie={movie} key={movie.id} layout="list" />;
}
