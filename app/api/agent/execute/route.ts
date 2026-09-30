import { db } from "@/db";
import { agents, runs } from "@/db/schema";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { GoogleGenAI } from "@google/genai";
import { Composio } from "composio-core";
import { Browserbase } from "browserbase";

export async function POST(req: Request) {
  try {
    const { agentId, userId, input, useBrowser } = await req.json();

    if (!agentId || !userId) {
      return NextResponse.json({ error: "Missing agentId or userId" }, { status: 400 });
    }

    // Fetch the agent
    const agentRecords = await db.select().from(agents).where(eq(agents.id, agentId));
    if (agentRecords.length === 0) {
      return NextResponse.json({ error: "Agent not found" }, { status: 404 });
    }
    const agent = agentRecords[0];

    // Create a run record (pending)
    const newRun = await db.insert(runs).values({
      agentId,
      userId,
      inputPrompt: input || "Run default task",
      status: "running"
    }).returning();
    const runId = newRun[0].id;

    const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_CLOUD_GEMINI_API_KEY;
    if (!apiKey) throw new Error("Missing Gemini API Key");
    const ai = new GoogleGenAI({ apiKey });

    // Initialize Composio
    let composioTools: any[] = [];
    if (process.env.COMPOSIO_API_KEY) {
      const composio = new Composio({ apiKey: process.env.COMPOSIO_API_KEY });
      // In a real scenario, you'd fetch the tools available for this user using Composio SDK
      // e.g. const entity = composio.getEntity(userId);
      // const tools = await entity.getTools();
      // composioTools = formatForGemini(tools);
    }

    // Initialize Browserbase
    let browserSessionInfo = "";
    if (useBrowser || input.toLowerCase().includes("browse")) {
      if (process.env.BROWSERBASE_API_KEY && process.env.BROWSERBASE_PROJECT_ID) {
        const bb = new Browserbase({ apiKey: process.env.BROWSERBASE_API_KEY });
        const session = await bb.sessions.create({ projectId: process.env.BROWSERBASE_PROJECT_ID });
        browserSessionInfo = `\nBrowser session started. Session ID: ${session.id}. You can use this session for browsing tasks.`;
      }
    }

    let systemInstruction = agent.prompt || agent.description || "You are a helpful AI agent.";
    if (browserSessionInfo) {
      systemInstruction += browserSessionInfo;
    }

    // Execute via Gemini
    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: input || "Execute your designated task.",
      config: {
        systemInstruction,
        // tools: [...composioTools], // pass composio tools to gemini here
      },
    });

    const outputResult = response.text || "No output generated.";

    // Update run record to completed
    await db.update(runs).set({
      status: "completed",
      outputResult
    }).where(eq(runs.id, runId));

    return NextResponse.json({ success: true, result: outputResult, runId });
  } catch (error: any) {
    console.error("API Route Error [/api/agent/execute]:", error);
    return NextResponse.json({ error: error.message || "Failed to execute agent" }, { status: 500 });
  }
}
