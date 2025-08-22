import { NextResponse } from "next/server";
import { getAllIntroductions } from "@/app/lib/db";

export async function GET() {
  try {
    const members = await getAllIntroductions();
    return NextResponse.json({ members });
  } catch (error) {
    console.error("Error fetching members:", error);
    return NextResponse.json({ members: [] });
  }
}
