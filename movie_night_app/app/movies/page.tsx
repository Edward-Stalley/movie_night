import { groupMovies, groupWatchedMovies } from "@/lib/transform";
import Image from "next/image";
import { MovieBase } from "@/lib/types/domain";
import { getMoviesListRaw } from "@/lib/queries";

export const dynamic = "force-dynamic";

export default async function GeneralMovieList() {
  const data = await getMoviesListRaw();
  const movies: MovieBase[] = groupMovies(data);
  const movieList = movies.map((m) => {
    return (
      <li
        key={`${m.overview}+${m.originalTitle}`}
        className="list-row bg-neutral m-4"
      >
        <div className="text-4xl font-thin opacity-30 tabular-nums"></div>
        <div>
          <div>
            <Image
              className="rounded-xl"
              src={`https://image.tmdb.org/t/p/w500/${m.posterPath}`}
              width={210}
              height={315}
              priority
              alt={`${m.originalTitle} (${m.releaseDate})`}
            />
          </div>
        </div>
      </li>
    );
  });

  return (
    <div>
      <ul className=" grid grid-cols-5 list bg-base-100 rounded-box shadow-md">
        {movieList}
      </ul>
    </div>
  );
}
