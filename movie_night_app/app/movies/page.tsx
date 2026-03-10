import { groupMovies } from "@/lib/transform";
import { StoredMovie } from "@/lib/types/domain";
import { getMovies } from "@/lib/queries/movies";
import MovieCard from "../components/MovieCard";
export const dynamic = "force-dynamic";

export default async function GeneralMovieList() {
  const data = await getMovies();

  const movies: StoredMovie[] = groupMovies(data);

  const movieList = movies.map((m) => {
    return (
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
    );
  });

  return (
    <div>
      <ul className="bg-base-100 pt-2 pl-5 pr-5 grid gap-2 sm:grid-cols-2  md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
        {movieList}
      </ul>
    </div>
  );
}
