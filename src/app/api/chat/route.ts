import type { NextRequest } from "next/server";
import { createOpenAI } from "@ai-sdk/openai";
import { streamText, tool } from "ai";
import { auth } from "@/auth";
import { AI_MODEL, LANGUAGE_MAP } from "@/constants/ai-info";
import { z } from "zod";
import yahooFinance from "yahoo-finance2";
import { REUTERS_CODES } from "@/constants/stockCodes";

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
      system: `You are a helpful stock analyst. Answer my questions about the stock market. please answer in ${LANGUAGE_MAP[session?.user.language ?? "ko"]} and use markdown.`,
      tools: {
        getStockInformation: tool({
          description: "Get the stock information from yahoo finance",
          parameters: z.object({
            stockSymbolCode: z.string().describe("It's a symbol code of the stock example: AAPL"),
            reutersCode: z.string().describe("It's a reuters code of the stock example: AAPL.O"),
          }),
          execute: async ({ stockSymbolCode, reutersCode }) => {
            const quoteSummary = await yahooFinance.quoteSummary(stockSymbolCode);
            if (REUTERS_CODES.includes(reutersCode as any)) {
              const res = await fetch(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/report/stock-analysis/${reutersCode}/ai-tool`,
                {
                  cache: "no-store",
                },
              );
              const analysis = (await res.json()).data[0];
              const description = analysis.description[`${session?.user.language ?? "ko"}`];

              const summaryRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/ai/summary/static`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  content: description,
                }),
                cache: "no-store",
              });

              const summary = await summaryRes.json();

              if (!quoteSummary || !summary) {
                throw new Error("No data found in the ai tool");
              }

              return {
                stockSymbolCode,
                quoteSummary,
                summary: summary.contentSummary,
              };
            } else {
              return {
                stockSymbolCode,
                quoteSummary,
                summary: null,
              };
            }
          },
        }),
        explainInvestmentIndicators: tool({
          description: `Explain the investment indicators of the stock analysis.
            - profitabilityPercentage: An indicator of how much you can expect to earn in a year's time, expressed as a percentage.
            - interestPercentage: An indicator of how much people are interested in this stock recently use search , expressed as a percentage.
            - growthPercentage: An indicator of how much the company is expected to grow in the future, expressed as a percentage.
            - investmentIndex: An overall cumulative score above (profitability, interest, growth) of the stock , expressed as a percentage.
          `,
          parameters: z.object({
            explanation: z
              .string()
              .describe("explain the investment indicators of the stock analysis please answer in markdown"),
          }),
          execute: async ({ explanation }) => {
            if (!explanation) {
              throw new Error("No data found in the ai tool");
            }

            return {
              explanation,
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
