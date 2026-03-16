import MovieCard from '@/app/components/movies/MovieCard';
import { DeleteMovieButton } from '@/app/components/shared/DeleteMovieButton';
import { MoviePoster } from '@/app/components/shared/MoviePoster';
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

  return <MovieCard movie={movie} key={movie.id} layout="list" />;
}
