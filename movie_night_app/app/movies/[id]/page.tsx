import MovieCard from '@/app/components/MovieCard';
import { getMovie } from '@/lib/queries/movies';
import { groupMovies } from '@/lib/transform';

export default async function MovieDetail({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;

  const numericId = Number(id);
  const data = await getMovie(numericId);
  if (!data) {
    return <div>Movie Not Found</div>;
  }

  const m = groupMovies([data])[0];

  return (
    <div>
      <MovieCard
        key={m.id}
        id={m.id}
        tmdbId={m.tmdbId}
        originalTitle={m.originalTitle}
        overview={m.overview}
        releaseDate={m.releaseDate}
        posterPath={m.posterPath}
        genreIds={m.genreIds}
      />
    </div>
  );
}
