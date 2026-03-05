import { groupWatchedMovies } from "@/lib/transform";
import type { WatchedMovie } from "@/lib/types/domain";
import WatchedMoviesLayout from "../components/watched-movies/WatchedMoviesLayout";

export const dynamic = "force-dynamic";

export default async function WatchedMovies() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/movies/watched`,
    {
      cache: "no-store",
    },
  );
  const rows = await res.json();

  const movies: WatchedMovie[] = groupWatchedMovies(rows);

  return <WatchedMoviesLayout movies={movies} />;
}
