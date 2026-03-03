import { groupWatchedMovies } from "@/lib/transform";
import type { WatchedMovie } from "@/lib/types/domain";
import Image from "next/image";
import { StarRating } from "@/app/components/starRating";

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
  const movieList = movies.map((m) => {
    return (
      <li key={`${m.chosenBy}+${m.id}`} className="list-row bg-neutral m-4">
        <div className="text-4xl font-thin opacity-30 tabular-nums"></div>
        <div>
          <div>
            <Image
              className="rounded-xl"
              src={`https://image.tmdb.org/t/p/w500/${m.posterPath}`}
              width={210}
              height={0}
              priority
              alt={`${m.originalTitle} (${m.releaseDate})`}
            />
          </div>
        </div>
        <div className="list-col-grow">
          <div className="text-3xl">{m.originalTitle}</div>

          <div className="text-2xl uppercase font-semibold opacity-60">
            {/* {m.watchedOn.getFullYear()} */}
            {/* {m.release_date?.getFullYear()} */}
          </div>
          <div>
            {m.reviews.map((r) => (
              <div
                key={r.ratedBy}
                className=" flex bg-accent-content m-1 rounded-2xl pt-2 pl-2"
              >
                <div
                  className={`${r.ratedBy === m.chosenBy ? "text-accent font-bold" : ""} mr-1 w-10`}
                >
                  {r.ratedBy}
                </div>
                <div className="flex-col">
                  <StarRating rating={r.rating} />
                  <div className="flex pl-2 pt-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      // xmlns:xlink="http://www.w3.org/1999/xlink"
                      fill="white"
                      height="15px"
                      width="15px"
                      version="1.1"
                      id="Capa_1"
                      viewBox="0 0 198 198"
                      // xml:space="preserve"
                    >
                      <g>
                        <path d="M0,92.905h48.024c-0.821,35-10.748,38.973-23.216,40.107L20,133.608v38.486l5.542-0.297   c16.281-0.916,34.281-3.851,46.29-18.676C82.359,140.125,87,118.893,87,86.3V25.905H0V92.905z" />
                        <path d="M111,25.905v67h47.383c-0.821,35-10.427,38.973-22.895,40.107L131,133.608v38.486l5.222-0.297   c16.281-0.916,34.442-3.851,46.451-18.676C193.199,140.125,198,118.893,198,86.3V25.905H111z" />
                      </g>
                    </svg>
                    <div className="pl-2"> {r.comment}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <button className="btn btn-square btn-ghost"></button>
      </li>
    );
  });

  return (
    <ul className="list bg-base-100 rounded-box shadow-md">
      <li className=" text-base-content text-4xl font-bold p-4 pb-2 opacity-40 tracking-wide">
        Watched Movies
      </li>
      {movieList}
    </ul>
  );
}
