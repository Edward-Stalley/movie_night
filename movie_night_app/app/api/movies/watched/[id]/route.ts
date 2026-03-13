import { showWatchedMovie, updateChosenBy, updateWatchedOn } from '@/lib/queries/watched-movies';
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
    const { id } = await context.params;
    const body = await req.json();

    //  Updates chosen_by
    if (body.chosenBy !== undefined) {
      await updateChosenBy(Number(id), body.chosenBy);
    }

    //  Updates watched_on
    if (body.watchedOn !== undefined) {
      await updateWatchedOn(Number(id), body.watchedOn);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('PATCH Failed', error);
    return NextResponse.json({ error: 'PATCH Failed' }, { status: 500 });
  }
}
