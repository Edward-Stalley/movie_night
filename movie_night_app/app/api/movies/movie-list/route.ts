import { getMovies, deleteMovie } from "@/lib/queries";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const body = await getMovies();
  return NextResponse.json(body);
}