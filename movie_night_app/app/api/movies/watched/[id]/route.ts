
import { getWatchedMovie } from "@/lib/queries";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await context.params;
    const numericId = Number(id);
    await getWatchedMovie(numericId);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("GET Failed", error);
    return NextResponse.json({ error: "GET Failed" }, { status: 500 });
  }
}