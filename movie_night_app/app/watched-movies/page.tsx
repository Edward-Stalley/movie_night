import { groupWatchedMovies } from "@/lib/transform";
import type { LoggedInUser, WatchedMovie } from "@/lib/types/domain";
import WatchedMoviesLayout from "../components/watched-movies/WatchedMoviesLayout";
import { auth } from "@/app/auth";
import { mapSessionToLoggedInUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function WatchedMovies() {
  const session = await auth();
  // const loggedInUser = session?.user;
  const loggedInUser = mapSessionToLoggedInUser(session);
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/movies/watched`,
    {
      cache: "no-store",
    },
  );
  const rows = await res.json();

  const movies: WatchedMovie[] = groupWatchedMovies(rows);

  return <WatchedMoviesLayout movies={movies} loggedInUser={loggedInUser} />;
}
