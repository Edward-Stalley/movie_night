import { searchMovie } from '@/lib/external/tmdb';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const movieToSearch = searchParams.get('movie') ?? '';

    const pageString = searchParams.get('page') ?? '';
    const page = Math.max(1, Number(pageString) || 1);

    const movies = await searchMovie(movieToSearch, page);

    return NextResponse.json(movies);
  } catch (error) {
    console.error(error);

    return NextResponse.json({ error: 'Failed to Load Movies' }, { status: 500 });
  }
}
