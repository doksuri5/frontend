import type { NextRequest } from "next/server";
import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";
import { auth } from "@/auth";

export const runtime = "edge";
export const maxDuration = 30;

export const POST = async (req: NextRequest) => {
  const { messages } = await req.json();
  const session = await auth();

  const ai = createOpenAI({
    apiKey: process.env.OPENAI_KEY,
  });

  const model = ai.chat("gpt-3.5-turbo");

  const result = await streamText({
    model,
    system: `You are a helpful stock analyst. Answer my questions about the stock market. but short and sweet. answer in ${session?.user.language ?? "ko"} language.`,
    messages,
  });

  return result.toAIStreamResponse();
};
