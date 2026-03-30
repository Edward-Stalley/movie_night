// # The Movie Database API REQUESTS
// # Connection to The Movie Database API.

import { getBestTrailer } from '@/lib/utils/tmdb/getBestTrailer';
import { toTMDBMovie } from '../transform';

const tmdbBaseUrl = process.env.NEXT_PUBLIC_TMDB_BASE_URL;
const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

export async function searchMovie(query: string, page: number) {
  const res = await fetch(
    `${tmdbBaseUrl}/search/movie?include_adult=false&language=en-US&page=${page}&query=${encodeURIComponent(query)}&api_key=${apiKey}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    },
  );

  if (!res.ok) {
    let errorBody;

    try {
      errorBody = await res.json();
    } catch {
      errorBody = await res.text();
    }

    console.error('TMDB ERROR:', {
      status: res.status,
      body: errorBody,
    });

    throw new Error(`TMDB Error ${res.status}`);
  }
  const data = await res.json();
  return data;
}

// export async function getSearchedMovieDetails(id: number) {
//   const res = await fetch(`${tmdbBaseUrl}/movie/${id}?api_key=${apiKey}&language=en-US`);
//   if (!res.ok) {
//     throw new Error('Failed to fetch movie details');
//   }

//   return res.json();
// }

export async function getSearchedMovieDetails(id: number) {
  const movieUrl = `${tmdbBaseUrl}/movie/${id}?api_key=${apiKey}&language=en-US`;
  const videosUrl = `${tmdbBaseUrl}/movie/${id}/videos?api_key=${apiKey}&language=en-US`;

  const [movieRes, videoRes] = await Promise.all([fetch(movieUrl), fetch(videosUrl)]);

  if (!movieRes.ok) throw new Error('Failed to fetch movie details');
  if (!videoRes.ok) throw new Error('Failed to fetch movie videos');

  const tmdbMovieApi = await movieRes.json();
  const videosData = await videoRes.json();

  const trailerUrl = getBestTrailer(videosData.results);

  // # raw TMDBMovieApi → TMDBMovie
  const tmdbMovie = toTMDBMovie({ ...tmdbMovieApi, trailer_url: trailerUrl });

  return tmdbMovie;
}
