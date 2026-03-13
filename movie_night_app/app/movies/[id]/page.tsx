import MovieCard from '@/app/components/MovieCard';
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
      <MovieCard
        key={movie.id}
        id={movie.id}
        tmdbId={movie.tmdbId}
        originalTitle={movie.originalTitle}
        overview={movie.overview}
        releaseDate={movie.releaseDate}
        posterPath={movie.posterPath}
        genreIds={movie.genreIds}
      />
    </div>
  );
}
