import { NextResponse } from "next/server";
import { getITProfessionals } from "@/app/lib/db";

export async function GET() {
  try {
    const professionals = await getITProfessionals();
    return NextResponse.json({ professionals });
  } catch (error) {
    console.error("Error fetching professionals:", error);
    return NextResponse.json({ professionals: [] });
  }
}
