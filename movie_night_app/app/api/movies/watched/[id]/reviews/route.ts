import { upsertReview } from "@/lib/queries";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const createOrUpdateReview = await upsertReview(body);
    console.log("in post for review: body:", body);

    return NextResponse.json(createOrUpdateReview);
  } catch (err) {
    console.log("error in api/reviews,", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
