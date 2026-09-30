import { NextResponse } from 'next/server';
import { Composio } from 'composio-core';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ error: "Missing userId parameter" }, { status: 400 });
    }

    if (!process.env.COMPOSIO_API_KEY) {
      return NextResponse.json({ error: "COMPOSIO_API_KEY is not set" }, { status: 500 });
    }

    const composio = new Composio({ apiKey: process.env.COMPOSIO_API_KEY });
    const entity = composio.getEntity(userId);
    
    const connections = await entity.getConnections();

    return NextResponse.json({ connections: connections || [] });
  } catch (error: any) {
    console.error("Composio list error:", error);
    return NextResponse.json({ error: error.message || "Failed to fetch connections" }, { status: 500 });
  }
}
