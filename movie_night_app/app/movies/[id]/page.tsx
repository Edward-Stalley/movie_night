import MovieCard from '@/app/components/movies/MovieCard';
import { BackButton } from '@/app/components/ui/BackButton';
import { getMovie } from '@/lib/queries/movies';
import { toStoredMovies } from '@/lib/transform';

export default async function MovieDetail({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;

  const numericId = Number(id);
  const data = await getMovie(numericId);

  if (!data) {
    return <div>Movie Not Found</div>;
  }

  const movie = toStoredMovies(data);

  return (
    <div>
      <BackButton />
      <MovieCard movie={movie} key={movie.id} layout="list" />
    </div>
  );
}
