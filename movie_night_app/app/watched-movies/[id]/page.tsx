import { groupWatchedMovies } from "@/lib/transform";
import type { WatchedMovie } from "@/lib/types/domain";
import { showWatchedMovie } from "@/lib/queries/watched-movies";
import WatchedMovieCard from "@/app/components/WatchedMovieCard";
import { auth } from "@/app/auth";
import { mapSessionToLoggedInUser } from "@/lib/auth/session";

export const dynamic = "force-dynamic";

export default async function WatchedMovieDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  // const loggedInUser = session?.user
  const loggedInUser = mapSessionToLoggedInUser(session);

  const id = (await params).id;

  const numericId = Number(id);
  const rows = await showWatchedMovie(numericId);

  if (rows === null) return <div>Movie Not Found</div>;

  const m: WatchedMovie = groupWatchedMovies(rows)[0];

  return (
    <ul className="list bg-base-100 rounded-box shadow-md">
      <li className=" text-base-content text-4xl font-bold p-4 pb-2 opacity-40 tracking-wide">
        {m.originalTitle}
      </li>
      <WatchedMovieCard
        movie={m}
        key={`${m.id}+${m.movieId}`}
        layout={"list"}
        isDetailScreen={true}
        loggedInUser={loggedInUser}
      />
    </ul>
  );
}
