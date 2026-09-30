import { GoogleGenAI, Type } from "@google/genai";
import { NextResponse } from "next/server";

// Define schema using @google/genai Type enum for native JSON structure enforcement
const AgentConfigRespSchema = {
  type: Type.OBJECT,
  properties: {
    status: {
      type: Type.STRING,
      enum: ["needs_clarification", "ready"],
    },
    clarificationQuestions: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.STRING },
          question: { type: Type.STRING },
          type: { type: Type.STRING },
          options: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
          },
          allowCustom: { type: Type.BOOLEAN },
          customPlaceholder: { type: Type.STRING },
        },
        required: ["id", "question", "type"],
      },
    },
    config: {
      type: Type.OBJECT,
      properties: {
        name: { type: Type.STRING },
        description: { type: Type.STRING },
        objective: { type: Type.STRING },
        instructions: { type: Type.STRING },
        skills: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
        },
        tools: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
        },
        schedule: {
          type: Type.OBJECT,
          properties: {
            type: { type: Type.STRING },
            frequency: { type: Type.STRING },
            time: { type: Type.STRING },
            time_zone: { type: Type.STRING },
          },
        },
        outputFormat: { type: Type.STRING },
      },
    },
  },
  required: ["status"],
};

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt || typeof prompt !== "string" || !prompt.trim()) {
      return NextResponse.json(
        { error: "A valid prompt string is required." },
        { status: 400 }
      );
    }

    // Support both environment variable keys
    const apiKey =
      process.env.GEMINI_API_KEY || process.env.GOOGLE_CLOUD_GEMINI_API_KEY;

    if (!apiKey) {
      console.error(
        "API Key Missing: Neither GEMINI_API_KEY nor GOOGLE_CLOUD_GEMINI_API_KEY is set in .env"
      );
      return NextResponse.json(
        { error: "Server Configuration Error: Gemini API key missing." },
        { status: 500 }
      );
    }

    const ai = new GoogleGenAI({ apiKey });

    const systemInstruction = `You are an AI Agent builder assistant.
Analyze the user prompt to generate an AI agent configuration.
- If the user request is clear and actionable, set "status" to "ready" and generate the "config" containing name, description, objective, instructions, skills, tools, schedule, and outputFormat.
- If key details or choices are needed, set "status" to "needs_clarification" and provide relevant questions in "clarificationQuestions".`;

    // Native Structured Output generation
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `User Request: "${prompt}"`,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: AgentConfigRespSchema,
      },
    });

    const responseText = response.text;
    if (!responseText) {
      throw new Error("Empty response received from Gemini model.");
    }

    // Direct, safe JSON parsing guaranteed by responseSchema
    const data = JSON.parse(responseText);

    return NextResponse.json(data);
  } catch (error: any) {
    console.error("API Route Error [/api/agent/configure]:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to configure agent" },
      { status: 500 }
    );
  }
}