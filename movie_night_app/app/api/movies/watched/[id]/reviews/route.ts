import { upsertReview } from "@/lib/queries/movie-ratings";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  console.log("inside the api for movie rating")
  try {
    const body = await req.json();
    const createOrUpdateReview = await upsertReview(body);

    return NextResponse.json(createOrUpdateReview);
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}