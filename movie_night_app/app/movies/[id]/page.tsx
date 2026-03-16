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

  return (
    <div className="relative flex gap-4 bg-base-300 m-2 w-fit p-2 rounded-2xl ">
      <MovieCard movie={movie} key={movie.id} layout="list" />
    </div>
  );
}
