import type { NextRequest } from "next/server";
import { createOpenAI } from "@ai-sdk/openai";
import { generateObject } from "ai";
import { z } from "zod";
import { FetchedNaverStockDataType } from "@/types/StockDataType";
import { kv } from "@vercel/kv";
import yahooFinance from "yahoo-finance2";
import { unstable_noStore as noStore } from "next/cache";
import { auth } from "@/auth";

export const maxDuration = 30;

export const GET = async (request: NextRequest, { params }: { params: { code: string } }) => {
  try {
    const session = await auth();

    const key = `stock:${params.code}`;
    noStore();
    const cached = await kv.hgetall(key);

    if (cached) {
      console.log(`stock: ${params.code} cached`);
      return Response.json({
        ok: true,
        data: [
          {
            ...cached,
          },
        ],
      });
    }

    const stockInfo = await fetch(`https://api.stock.naver.com/stock/${params.code}/basic`);
    const stockInfoData = (await stockInfo.json()) as FetchedNaverStockDataType;

    const quoteSummary = await yahooFinance.quoteSummary(stockInfoData.symbolCode, {
      modules: ["financialData", "summaryDetail", "defaultKeyStatistics", "price"],
    });

    const metrics = {
      stockName: stockInfoData.stockName,
      stockNameEng: stockInfoData.stockNameEng,
      ROE: quoteSummary.financialData?.returnOnEquity,
      PER: quoteSummary.summaryDetail?.trailingPE,
      forwardPER: quoteSummary.summaryDetail?.forwardPE,
      dividendYield: quoteSummary.summaryDetail?.dividendYield,
      currentPrice: stockInfoData.closePrice,
      currentPriceRatio: (quoteSummary.price?.regularMarketChangePercent ?? 0) * 100,
      currentPriceChange: quoteSummary.price?.regularMarketChange,
    };

    const ai = createOpenAI({
      apiKey: process.env.OPENAI_KEY,
    });

    const model = ai.chat("gpt-3.5-turbo");

    const response = await generateObject({
      model,
      schema: z.object({
        description: z.string(),
        investmentIndex: z.number().int().min(-100).max(100),
        profitabilityPercentage: z.number().int().min(-100).max(100),
        interestPercentage: z.number().int().min(-100).max(100),
        growthPercentage: z.number().int().min(-100).max(100),
        report: z.string(),
      }),
      system:
        "You are a stock analyst. You are analyzing a stock and providing a report on its profitability, interest, and growth potential.",
      prompt: `
        s&p500 is a trailing PER of 20.36, which is the average for the past 10 years.
        The S&P500 average is 22.93 Forward PER (the next 12 months).
        The company's data is as follows:
        The company is ${metrics.stockNameEng}.
        The company's ROE is ${metrics.ROE}.
        The company's PER is ${metrics.PER}.
        The company's forward PER is ${metrics.forwardPER}.
        The company's dividend yield is ${metrics.dividendYield}.
        The company's current price is ${metrics.currentPrice}.
        The company's current price ratio is ${metrics.currentPriceRatio}.        if per is higher than 20.36, the company is considered overvalued. and forward per is higher than 22.93, the company is considered overvalued.
        if company forward per is lower then trailing per, It can be expected to grow gradually.
        summarize description for introduce for investor of this company in ${session?.user.language ?? "ko"} language just introduction not use data.
        please provide a report on the profitability, interest, and growth potential of the company and the reason for your analysis in ${session?.user.language ?? "ko"} language.
        profitabilityPercentage: An indicator of how much you can expect to earn in a year's time, expressed as a percentage.
        interestPercentage: An indicator of how much people are interested in this stock recently use search , expressed as a percentage.
        growthPercentage: An indicator of how much the company is expected to grow in the future, expressed as a percentage.
        investmentIndex: An overall cumulative score above (profitability, interest, growth) of the stock , expressed as a percentage.
      `,
    });

    const returnMetrics = {
      stockName: metrics.stockName,
      symbolCode: params.code,
      fluctuationsRatio: metrics.currentPriceRatio,
      closePriceChange: metrics.currentPriceChange,
      closePrice: metrics.currentPrice,
    };

    await kv.hmset(key, {
      ...response.object,
      metrics: returnMetrics,
    });

    await kv.expire(key, 60 * 60 * 6);
    return Response.json({
      ok: true,
      data: [
        {
          ...response.object,
          metrics: returnMetrics,
        },
      ],
    });
  } catch (error) {
    console.error(error);
    return Response.error();
  }
};
