import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const movieToSearch = url.searchParams.get('movie') ?? '';
  const page = url.searchParams.get('page') ?? '1';

  // call TMDB or your DB
  const data = await fetch(
    `https://api.themoviedb.org/...&query=${movieToSearch}&page=${page}`,
  ).then((res) => res.json());

  return NextResponse.json(data);
}
