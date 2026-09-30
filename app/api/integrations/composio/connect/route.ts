import { NextResponse } from 'next/server';
import { Composio } from 'composio-core';

export async function POST(req: Request) {
  try {
    const { userId, appName } = await req.json();

    if (!userId || !appName) {
      return NextResponse.json({ error: "Missing userId or appName" }, { status: 400 });
    }

    if (!process.env.COMPOSIO_API_KEY) {
      return NextResponse.json({ error: "COMPOSIO_API_KEY is not set" }, { status: 500 });
    }

    const composio = new Composio({ apiKey: process.env.COMPOSIO_API_KEY });
    const entity = composio.getEntity(userId);
    
    const redirectUrl = process.env.NEXT_PUBLIC_APP_URL 
      ? `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/integrations` 
      : 'http://localhost:3000/dashboard/integrations';
      
    const connection = await entity.initiateConnection({
      appName: appName,
      redirectUrl: redirectUrl
    });

    return NextResponse.json({ redirectUrl: connection.redirectUrl });
  } catch (error: any) {
    console.error("Composio connect error:", error);
    return NextResponse.json({ error: error.message || "Failed to initiate connection" }, { status: 500 });
  }
}
