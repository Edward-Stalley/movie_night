import { getMovies, addMovie } from '@/lib/queries/movies';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  const body = await getMovies();
  return NextResponse.json(body);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const newMovie = await addMovie(body);

  return NextResponse.json(newMovie);
}
