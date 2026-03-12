// # The Movie Database API REQUESTS
// # Connection to The Movie Database API.

const tmdbBaseUrl = process.env.NEXT_PUBLIC_TMDB_BASE_URL;
const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

export async function searchMovie(query: string) {
  const res = await fetch(
    `${tmdbBaseUrl}/search/movie?include_adult=false&language=en-US&page=1&query=${encodeURIComponent(query)}&api_key=${apiKey}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    },
  );

  if (!res.ok) {
    throw new Error('Fails to fetch popular movies');
  }

  const data = await res.json();
  return data;
}
