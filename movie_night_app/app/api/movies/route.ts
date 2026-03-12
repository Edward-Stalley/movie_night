import { getMovies } from '@/lib/queries/movies';
import { addWatchedMovie } from '@/lib/queries/watched-movies';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  const body = await getMovies();
  return NextResponse.json(body);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const newMovie = await addWatchedMovie(body);

  return NextResponse.json(newMovie);
}
