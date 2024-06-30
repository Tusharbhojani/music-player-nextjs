import { SONGS } from "@/data/songs";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  return NextResponse.json(
    { success: true, message: "Data fetched successfully!", data: SONGS },
    { status: 200 }
  );
}
