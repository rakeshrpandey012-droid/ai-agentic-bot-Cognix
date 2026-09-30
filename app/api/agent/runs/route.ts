import { db } from "@/db";
import { runs } from "@/db/schema";
import { NextResponse } from "next/server";
import { eq, desc } from "drizzle-orm";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    let userIdStr = searchParams.get("userId");
    if (!userIdStr || userIdStr === "undefined") {
      userIdStr = "1";
    }
    const userId = parseInt(userIdStr, 10);

    const userRuns = await db
      .select()
      .from(runs)
      .where(eq(runs.userId, userId))
      .orderBy(desc(runs.createdAt));

    return NextResponse.json({ runs: userRuns });
  } catch (error: any) {
    console.error("API Route Error [/api/agent/runs]:", error);
    return NextResponse.json({ error: "Failed to fetch runs" }, { status: 500 });
  }
}
