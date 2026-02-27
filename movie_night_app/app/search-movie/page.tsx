"use client";

import Image from "next/image";
import { searchMovie } from "@/lib/tmdb";
import { MouseEvent, useState } from "react";
import { addMovie } from "@/lib/queries";
import { SearchedMovie } from "@/lib/types/db";
import { transformSearchedMovies } from "@/lib/transform";

export default function SearchMovie() {
  const [movieTitle, setMovieTitle] = useState("");
  // need to define this type later
  const [movieResults, setMovieResults] = useState<SearchedMovie[]>([]);
  const searchForMovie = async () => {
    try {
      const data = await searchMovie(movieTitle);
      const transformedMovieData = transformSearchedMovies(data.results);
      setMovieResults(transformedMovieData || []);
    } catch (err) {
      setMovieResults([]);
    }
  };

  const addToBookmarks = async (movie: SearchedMovie) => {
    // const movieData: MovieInsert = {
    //   originalTitle: movie.originalTitle,
    //   tmdbId: movie.id, // <-- TMDB id maps to db tmdb_id
    //   posterPath: movie.posterPath,
    //   genreIds: movie.genreIds,
    //   overview: movie.overview,
    //   releaseDate: movie.releaseDate,
    // };

    // call your DB function
    // const newMovie = await addMovie(movieData);
    console.log("Saved to DB:", movie);
  };

  const searchedMovieResults = movieResults.map(
    (m: SearchedMovie, index: number) => (
      <div
        key={`${m.originalTitle}+${m.releaseDate}`}
        className="carousel-item m-1"
      >
        <div className=" card image-full group hover:opacity-70 relative">
          <Image
            className="rounded-xl cursor-pointer "
            src={`https://image.tmdb.org/t/p/w500/${m.posterPath}`}
            width={200}
            height={100}
            priority
            alt={`${m.originalTitle} (${m.releaseDate})`}
          />
          <button
            // onClick={(e) =>
            //   addToBookmarks({
            //     originalTitle: m.originalTitle,
            //     posterPath: m.posterPath,
            //     id: m.tmdbId, //tmdb id ??
            //     genreIds: m.genreIds,
            //     overview: m.overview,
            //     releaseDate: m.releaseDate,
            //   })
            // }
            className=" btn btn-primary absolute inset-0 m-auto w-fit h-fit opacity-0 group-hover:opacity-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 50 50"
              width="50px"
              height="50px"
            >
              <path d="M 25 2 C 12.309295 2 2 12.309295 2 25 C 2 37.690705 12.309295 48 25 48 C 37.690705 48 48 37.690705 48 25 C 48 12.309295 37.690705 2 25 2 z M 25 4 C 36.609824 4 46 13.390176 46 25 C 46 36.609824 36.609824 46 25 46 C 13.390176 46 4 36.609824 4 25 C 4 13.390176 13.390176 4 25 4 z M 24 13 L 24 24 L 13 24 L 13 26 L 24 26 L 24 37 L 26 37 L 26 26 L 37 26 L 37 24 L 26 24 L 26 13 L 24 13 z" />
            </svg>
            {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 50 50"
            width="20px"
            height="20px"
          >
            <path d="M 12.8125 2 C 12.335938 2.089844 11.992188 2.511719 12 3 L 12 47 C 11.996094 47.359375 12.1875 47.691406 12.496094 47.871094 C 12.804688 48.054688 13.1875 48.054688 13.5 47.875 L 25 41.15625 L 36.5 47.875 C 36.8125 48.054688 37.195313 48.054688 37.503906 47.871094 C 37.8125 47.691406 38.003906 47.359375 38 47 L 38 3 C 38 2.449219 37.550781 2 37 2 L 13 2 C 12.96875 2 12.9375 2 12.90625 2 C 12.875 2 12.84375 2 12.8125 2 Z M 14 4 L 36 4 L 36 45.25 L 25.5 39.125 C 25.191406 38.945313 24.808594 38.945313 24.5 39.125 L 14 45.25 Z" />
          </svg> */}
          </button>
        </div>
      </div>
    ),
  );

  return (
    <div className="flex flex-col bg-base-100">
      <div className="flex flex-col items-center">
        <input
          placeholder="Type Film Name..."
          value={movieTitle}
          onChange={(e) => setMovieTitle(e.target.value)}
          className="input m-2"
        ></input>

        <button
          onClick={searchForMovie}
          className="btn btn-soft btn-primary hover:btn-active"
        >
          Search
        </button>
      </div>
      <div>
        <div className="carousel carousel-center rounded-box p-4 m-8 bg-base-300">
          {searchedMovieResults}
        </div>
      </div>
    </div>
  );
}
