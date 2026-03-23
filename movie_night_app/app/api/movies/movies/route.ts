import { PAGE_SIZES } from '@/lib/config/pagination';
import { getMovies, addMovie } from '@/lib/queries/movies';
import { buildPagination } from '@/lib/utils/pagination';
import { NextRequest, NextResponse } from 'next/server';

// NOT USED CURRENTLY: MAY NEED FOR MOBILE THOUGH.
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const pageParam = searchParams.get('page') ?? undefined;

  const { pageSize: limit, page, offset } = buildPagination(PAGE_SIZES.movies, pageParam);
  const result = await getMovies(limit, offset);

  return NextResponse.json({
    ...result,
    page,
    limit,
  });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const newMovie = await addMovie(body);

  return NextResponse.json(newMovie);
}
