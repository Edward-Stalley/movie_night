import { searchMovie } from "@/lib/external/tmdb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const movieToSearch = searchParams.get("movie") ?? "";
    const movies = await searchMovie(movieToSearch);

    return NextResponse.json(movies);
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to Load Movies",
      },
      { status: 500 },
    );
  }
}
