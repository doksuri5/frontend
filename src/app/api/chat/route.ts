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
  try {
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
            stockSymbolCode: z.string().describe("It's a symbol code of the stock example: AAPL"),
            reutersCode: z.string().describe("It's a reuters code of the stock example: AAPL.O"),
          }),
          execute: async ({ stockSymbolCode, reutersCode }) => {
            const quoteSummary = await yahooFinance.quoteSummary(stockSymbolCode);
            const data = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/stock/${reutersCode}/description`).then(
              (res) => res.json(),
            );
            const description = data.data.corporateOverview;

            if (!quoteSummary || !description) {
              throw new Error("No data found in the ai tool");
            }

            return {
              stockSymbolCode,
              quoteSummary,
              description,
            };
          },
        }),
      },
      messages,
    });

    return result.toAIStreamResponse();
  } catch (error) {
    console.error(error);
  }
};
