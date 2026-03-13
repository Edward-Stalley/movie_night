'use client';

import Image from 'next/image';
import { searchMovie } from '@/lib/external/tmdb';
import { useState } from 'react';
import { toSearchedMovie } from '@/lib/transform';
import { SearchedMovie } from '@/lib/types/domain';
import { MovieInsert } from '@/lib/types/db';
import { addMovieToMovies } from '@/lib/api/movies';

export default function SearchMovie() {
  const [movieTitle, setMovieTitle] = useState('');
  const [movieResults, setMovieResults] = useState<SearchedMovie[]>([]);
  const [searched, setSearched] = useState<boolean>(false);

  const searchForMovie = async () => {
    try {
      const data = await searchMovie(movieTitle);
      const movies = data.results.map(toSearchedMovie);

      setMovieResults(movies || []);
      setSearched(true);
    } catch (err) {
      console.error(err);
      setMovieResults([]);
    }
  };

  const addToMovieList = async (movie: SearchedMovie) => {
    const movieData: MovieInsert = {
      originalTitle: movie.originalTitle,
      tmdbId: movie.id, // <-- TMDB id maps to db tmdb_id
      posterPath: movie.posterPath,
      genreIds: movie.genreIds,
      overview: movie.overview,
      releaseDate: movie.releaseDate,
    };

    await addMovieToMovies(movieData);
  };

  const searchedMovieResults = movieResults.map((m: SearchedMovie) => (
    <div key={`${m.originalTitle}+ ${m.overview} + ${m.id}`} className="carousel-item m-1">
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
          onClick={() =>
            addToMovieList({
              originalTitle: m.originalTitle,
              posterPath: m.posterPath,
              id: m.id, // === tmdb id
              genreIds: m.genreIds,
              overview: m.overview,
              releaseDate: m.releaseDate,
            })
          }
          className=" btn btn-primary absolute inset-0 m-auto w-fit h-fit opacity-0 group-hover:opacity-100"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="50px" height="50px">
            <path d="M 25 2 C 12.309295 2 2 12.309295 2 25 C 2 37.690705 12.309295 48 25 48 C 37.690705 48 48 37.690705 48 25 C 48 12.309295 37.690705 2 25 2 z M 25 4 C 36.609824 4 46 13.390176 46 25 C 46 36.609824 36.609824 46 25 46 C 13.390176 46 4 36.609824 4 25 C 4 13.390176 13.390176 4 25 4 z M 24 13 L 24 24 L 13 24 L 13 26 L 24 26 L 24 37 L 26 37 L 26 26 L 37 26 L 37 24 L 26 24 L 26 13 L 24 13 z" />
          </svg>
        </button>
      </div>
    </div>
  ));

  return (
    <div className="flex flex-col bg-base-100 w-full pt-6 ">
      <div className="flex flex-col items-center">
        <input
          placeholder="Type Film Name..."
          value={movieTitle}
          onChange={(e) => setMovieTitle(e.target.value)}
          className="input m-2"
        ></input>

        <button onClick={searchForMovie} className="btn btn-soft btn-primary hover:btn-active">
          Search
        </button>
      </div>
      <div>
        <div
          className={`carousel carousel-center rounded-box p-4 m-8 ${searched && 'bg-base-300'}`}
        >
          {searchedMovieResults}
        </div>
      </div>
    </div>
  );
}
