import { deleteMovie, getMovie } from '@/lib/queries/movies';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const numericId = Number(id);
    await getMovie(numericId);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('GET Failed', error);
    return NextResponse.json({ error: 'GET Failed' }, { status: 500 });
  }
}

// The id is a number in MovieCard but it is sent via the url "api/movies/id" so it becomes a string.
// It is reconverted to a number here.

export async function DELETE(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const numericId = Number(id);
    await deleteMovie(numericId);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete Failed:', error);
    return NextResponse.json({ error: 'Delete Failed' }, { status: 500 });
  }
}
