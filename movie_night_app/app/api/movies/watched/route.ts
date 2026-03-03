import { getWatchedMoviesRaw, addMovie } from "@/lib/queries";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const body = await getWatchedMoviesRaw();
  return NextResponse.json(body);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const newMovie = await addMovie(body);

  return NextResponse.json(newMovie);
}
