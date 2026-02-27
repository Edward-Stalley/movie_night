import { getWatchedMoviesRaw } from "@/lib/queries";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const rows = await getWatchedMoviesRaw();
  return NextResponse.json(rows);
}
