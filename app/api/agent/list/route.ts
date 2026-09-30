import { db } from "@/db";
import { agents } from "@/db/schema";
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

    const userAgents = await db
      .select()
      .from(agents)
      .where(eq(agents.userId, userId))
      .orderBy(desc(agents.createdAt));

    return NextResponse.json({ agents: userAgents });
  } catch (error: any) {
    console.error("API Route Error [/api/agent/list]:", error);
    return NextResponse.json({ error: "Failed to fetch agents" }, { status: 500 });
  }
}
