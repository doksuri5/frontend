import type { NextRequest } from "next/server";
import { createOpenAI } from "@ai-sdk/openai";
import { generateObject } from "ai";
import yahooFinance from "yahoo-finance2";
import { z } from "zod";

export const maxDuration = 30;

export const GET = async (req: NextRequest, { params }: { params: { code: string } }) => {
  try {
    const quoteSummary = await yahooFinance.quoteSummary(params.code, {
      modules: ["financialData", "summaryDetail", "defaultKeyStatistics", "price"],
    });

    const metrics = {
      companyName: quoteSummary.price?.longName,
      ROE: quoteSummary.financialData?.returnOnEquity,
      PER: quoteSummary.summaryDetail?.trailingPE,
      forwardPER: quoteSummary.summaryDetail?.forwardPE,
      dividendYield: quoteSummary.summaryDetail?.dividendYield,
      currentPriceRatio: quoteSummary.financialData?.currentRatio,
      currentPrice: quoteSummary.price?.regularMarketPrice,
    };

    const llamaAI = createOpenAI({
      apiKey: process.env.TOGETHER_API_KEY,
      baseURL: process.env.TOGETHER_API_URL,
    });

    const model = llamaAI.chat("togethercomputer/CodeLlama-34b-Instruct");

    const response = await generateObject({
      model,
      schema: z.object({
        investmentIndex: z.number().int().min(-100).max(100),
        profitabilityPercentage: z.number().int().min(-100).max(100),
        interestPercentage: z.number().int().min(-100).max(100),
        growthPercentage: z.number().int().min(-100).max(100),
        report: z.string(),
      }),
      system:
        "You are a stock analyst. You are analyzing a stock and providing a report on its profitability, interest, and growth potential.",
      temperature: 0.7,
      prompt: `
        s&p500 is a trailing PER of 20.36, which is the average for the past 10 years.
        The S&P500 average is 22.93 Forward PER (the next 12 months).
        The company is ${metrics.companyName}.
        The company's ROE is ${metrics.ROE}.
        The company's PER is ${metrics.PER}.
        The company's forward PER is ${metrics.forwardPER}.
        The company's dividend yield is ${metrics.dividendYield}.
        The company's current price is ${metrics.currentPrice}.
        The company's current price ratio is ${metrics.currentPriceRatio}.
        if per is higher than 20.36, the company is considered overvalued. and forward per is higher than 22.93, the company is considered overvalued.
        if company forward per is lower then trailing per, It can be expected to grow gradually.
  
        please provide a report on the profitability, interest, and growth potential of the company and the reason for your analysis.
        example of analysisReason : "We raise our price target on Tesla by 26% to $340 and maintain our Top Pick, reflecting robust auto demand despite sharp rate hikes. 
        While we expect a short-term pause in the upside, the company's competitive position is stronger in the medium term. With traditional OEMs 
        slow to transition to EVs and Chinese start-ups' cash flows weakening, Tesla's Mexican factory is expected to widen the EV manufacturing competitiveness gap."
        Don't use this example. it is just an example. please provide your own analysis report. Be a little more specific about why.
  
        profitabilityPercentage: An indicator of how much you can expect to earn in a year's time, expressed as a percentage.
        interestPercentage: An indicator of how much people are interested in this stock recently use search , expressed as a percentage.
        growthPercentage: An indicator of how much the company is expected to grow in the future, expressed as a percentage.
        investmentIndex: An overall cumulative score above (profitability, interest, growth) of the stock , expressed as a percentage.
      `,
    });

    console.log(response.object);

    return Response.json({
      ...response.object,
      metrics,
    });
  } catch {
    return Response.error();
  }
};
