"use client";

import type { LoggedInUser, WatchedMovie } from "@/lib/types/domain";
import WatchedMovieCard from "@/app/components/WatchedMovieCard";
import LayoutToggle from "../ui/LayoutToggle";
import { useState } from "react";

export const dynamic = "force-dynamic";

type Props = {
  movies: WatchedMovie[];
  loggedInUser?: LoggedInUser;
};

export default function WatchedMoviesLayout({ movies, loggedInUser }: Props) {
  const [layout, setLayout] = useState<"list" | "grid">("grid");
  const movieList = movies.map((m: WatchedMovie) => {
    return (
      <WatchedMovieCard
        key={m.tmdbId}
        movie={m}
        isDetailScreen={false}
        layout={layout}
        loggedInUser={loggedInUser}
      />
    );
  });

  return (
    <>
      <LayoutToggle layout={layout} onChange={setLayout} />
      {layout === "list" && (
        <ul className="list bg-base-100 rounded-box shadow-md">
          <li className=" text-base-content text-4xl font-bold p-4 pb-2 opacity-40 tracking-wide">
            Watched Movies
          </li>
          {movieList}
        </ul>
      )}
      {layout === "grid" && (
        <ul className="bg-base-100 pt-2 pl-5 pr-5 grid gap-2 sm:grid-cols-2  md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
          {movieList}
        </ul>
      )}
    </>
  );
}
