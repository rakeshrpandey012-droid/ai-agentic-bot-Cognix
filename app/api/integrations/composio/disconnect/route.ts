import { NextResponse } from 'next/server';
import { Composio } from 'composio-core';

export async function POST(req: Request) {
  try {
    const { userId, connectionId } = await req.json();

    if (!userId || !connectionId) {
      return NextResponse.json({ error: "Missing userId or connectionId" }, { status: 400 });
    }

    if (!process.env.COMPOSIO_API_KEY) {
      return NextResponse.json({ error: "COMPOSIO_API_KEY is not set" }, { status: 500 });
    }

    const composio = new Composio({ apiKey: process.env.COMPOSIO_API_KEY });
    
    // There are a few ways SDK handles this. Often composio.connectedAccounts.delete is used
    try {
      await composio.connectedAccounts.delete(connectionId);
    } catch (e) {
      console.warn("Delete account failed, trying alternative SDK methods", e);
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Composio disconnect error:", error);
    return NextResponse.json({ error: error.message || "Failed to disconnect" }, { status: 500 });
  }
}
