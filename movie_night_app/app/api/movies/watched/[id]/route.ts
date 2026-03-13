import { showWatchedMovie, updateChosenBy } from '@/lib/queries/watched-movies';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const numericId = Number(id);
    await showWatchedMovie(numericId);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('GET Failed', error);
    return NextResponse.json({ error: 'GET Failed' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const {id} = await context.params
    const body = await req.json();
    console.log('body', body);

    await updateChosenBy(Number(id), body.userId);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('PATCH Failed', error);
    return NextResponse.json({ error: 'PATCH Failed' }, { status: 500 });
  }
}