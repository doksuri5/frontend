import type { NextRequest } from "next/server";
import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";

export const runtime = "edge";
export const maxDuration = 30;

export const POST = async (req: NextRequest) => {
  const { messages } = await req.json();

  const llamaAI = createOpenAI({
    apiKey: process.env.TOGETHER_API_KEY,
    baseURL: process.env.TOGETHER_API_URL,
  });

  const model = llamaAI.chat("meta-llama/Llama-3-8b-chat-hf");

  const result = await streamText({
    model,
    system: "You are a helpful stock analyst. Answer my questions about the stock market. but short and sweet.",
    messages,
    temperature: 0.5,
    maxTokens: 120,
    frequencyPenalty: 0.5,
    presencePenalty: 0.9,
  });

  return result.toAIStreamResponse();
};
