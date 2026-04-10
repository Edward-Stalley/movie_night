import { auth } from '@/auth';
import { addSearchedMovieToMoviesAction } from '@/lib/actions/addSearchedMovieToMovies';
import { PAGE_SIZES } from '@/lib/config/pagination';
import { getMovies } from '@/lib/queries/movies';
import { SearchedMovie } from '@/lib/types/domain';
import { buildQuery } from '@/lib/utils/query';
import { NextRequest, NextResponse } from 'next/server';

// NOT USED CURRENTLY: MAY NEED FOR MOBILE THOUGH.
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const params = {
    page: searchParams.get('page') ?? undefined,
    sort: searchParams.get('sort') ?? undefined,
    order: searchParams.get('order') ?? undefined,
  };

  const query = buildQuery(params, PAGE_SIZES.movies, 'title');

  const { data, total } = await getMovies(query);

  return NextResponse.json({
    data,
    total,
    page: query.page,
    totalPages: Math.ceil(total / query.limit),
  });
}

export async function POST(req: NextRequest) {
  try {
    const searchedMovie: SearchedMovie = await req.json();

    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
    }

    const newMovie = await addSearchedMovieToMoviesAction(searchedMovie, Number(session.user.id));

    return NextResponse.json(newMovie);
  } catch (error) {
    console.error('post error', error);
    return NextResponse.json({ error: 'failed to add movie' }, { status: 500 });
  }
}
