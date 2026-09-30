import { db } from "@/db";
import { agents } from "@/db/schema";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, description, prompt, userId } = await req.json();

    if (!name || !userId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Insert into DB
    const newAgent = await db.insert(agents).values({
      name,
      description,
      prompt,
      userId,
      status: "active"
    }).returning();

    return NextResponse.json({ agent: newAgent[0] });
  } catch (error: any) {
    console.error("API Route Error [/api/agent/create]:", error);
    return NextResponse.json({ error: "Failed to create agent" }, { status: 500 });
  }
}
