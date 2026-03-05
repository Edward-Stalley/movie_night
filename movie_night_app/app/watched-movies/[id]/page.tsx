import { groupWatchedMovies } from "@/lib/transform";
import type { WatchedMovie } from "@/lib/types/domain";
import { getWatchedMovie } from "@/lib/queries";
import WatchedMovieCard from "@/app/components/WatchedMovieCard";

export const dynamic = "force-dynamic";

export default async function WatchedMovieDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;

  const numericId = Number(id);
  const rows = await getWatchedMovie(numericId);

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
      />
    </ul>
  );
}
