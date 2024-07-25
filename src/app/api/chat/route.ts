import type { NextRequest } from "next/server";
import { createOpenAI } from "@ai-sdk/openai";
import { streamText, tool } from "ai";
import { auth } from "@/auth";
import { AI_MODEL, LANGUAGE_MAP } from "@/constants/ai-info";
import { z } from "zod";
import yahooFinance from "yahoo-finance2";

export const dynamic = "force-dynamic";

export const maxDuration = 30;

export const POST = async (req: NextRequest) => {
  const { messages } = await req.json();
  const session = await auth();

  const ai = createOpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const model = ai.chat(AI_MODEL);
  const result = await streamText({
    model,
    system: `You are a helpful stock analyst. Answer my questions about the stock market. please answer in ${LANGUAGE_MAP[session?.user.language ?? "ko"]}.`,
    tools: {
      getStockInformation: tool({
        description: "Get the stock information from yahoo finance",
        parameters: z.object({
          description: z.string().describe("introduce this stock"),
          stock: z.string().describe("It's a symbol code of the stock example: AAPL"),
        }),
        execute: async ({ stock, description }) => {
          const quoteSummary = await yahooFinance.quoteSummary(stock);

          return {
            stock,
            description,
            quoteSummary,
          };
        },
      }),
    },
    messages,
  });

  return result.toAIStreamResponse();
};
