import { getMoviesListRaw } from "@/lib/queries";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const body = await getMoviesListRaw();
  return NextResponse.json(body);
}