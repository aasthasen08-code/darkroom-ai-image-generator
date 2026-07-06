console.log("API ROUTE IS WORKING");
export const runtime = "nodejs";
import { NextResponse } from "next/server";
import { getImageProvider } from "@/lib/imageProviders";

// Allow this function up to 60s — Pollinations can be slow, and the
// Vercel default (10s) was likely causing a timeout that returns an
// HTML error page instead of JSON (the bug you're seeing).
export const maxDuration = 60;

const MAX_PROMPT_LENGTH = 1000;

export async function POST(request) {
  try {
    const body = await request.json();

    console.log("REQUEST BODY:",body);
    const prompt = typeof body?.prompt === "string" ? body.prompt.trim() : "";

    if (!prompt) {
      return NextResponse.json(
        { error: "A prompt is required." },
        { status: 400 }
      );
    }

    if (prompt.length > MAX_PROMPT_LENGTH) {
      return NextResponse.json(
        { error: `Prompt is too long (max ${MAX_PROMPT_LENGTH} characters).` },
        { status: 400 }
      );
    }

    const provider = getImageProvider();
    const { imageUrl } = await provider.generateImage(prompt);

    return NextResponse.json({ imageUrl });
  } catch (error) {
    console.error("Image generation failed:", error);

    const message =
      error?.error?.message ||
      error?.message ||
      "Image generation failed. Please try again.";
    const status = typeof error?.status === "number" ? error.status : 500;

    return NextResponse.json({ error: message }, { status });
  }
}