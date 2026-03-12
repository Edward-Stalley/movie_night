import { addWatchedMovie } from '@/lib/queries/watched-movies';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const newMovie = await addWatchedMovie(body);

  return NextResponse.json(newMovie);
}
