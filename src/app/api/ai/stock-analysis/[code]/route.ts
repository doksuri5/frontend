import type { NextRequest } from "next/server";
import { createOpenAI } from "@ai-sdk/openai";
import { generateObject } from "ai";
import { z } from "zod";
import { FetchedNaverStockDataType } from "@/types/StockDataType";
import yahooFinance from "yahoo-finance2";
import { AI_MODEL } from "@/constants/ai-info";
import * as deepl from "deepl-node";
import connectDB, { disconnectDB } from "@/lib/db";
import { StockAnalysis } from "@/models/stock-analysis-schema";

export const maxDuration = 60;

export const GET = async (request: NextRequest, { params }: { params: { code: string } }) => {
  try {
    await connectDB();

    const stockInfo = await fetch(`https://api.stock.naver.com/stock/${params.code}/basic`);
    const stockInfoData = (await stockInfo.json()) as FetchedNaverStockDataType;

    const integration = await fetch(`https://api.stock.naver.com/stock/${params.code}/integration`);
    const stockIntegrationData = await integration.json();
    const description = stockIntegrationData.corporateOverview as string;

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
      apiKey: process.env.OPENAI_API_KEY,
    });

    const model = ai.chat(AI_MODEL);

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
        The company's current price ratio is ${metrics.currentPriceRatio}.
        if per is higher than 20.36, the company is considered overvalued. and forward per is higher than 22.93, the company is considered overvalued.
        if company forward per is lower then trailing per, It can be expected to grow gradually.
        profitabilityPercentage: An indicator of how much you can expect to earn in a year's time, expressed as a percentage.
        interestPercentage: An indicator of how much people are interested in this stock recently use search , expressed as a percentage.
        growthPercentage: An indicator of how much the company is expected to grow in the future, expressed as a percentage.
        investmentIndex: An overall cumulative score above (profitability, interest, growth) of the stock , expressed as a percentage.
        Please provide a report on the profitability, interest, and growth potential of the company and the reason for your analysis.
        `,
    });

    const returnMetrics = {
      stockName: metrics.stockName,
      symbolCode: params.code,
      fluctuationsRatio: metrics.currentPriceRatio,
      closePriceChange: metrics.currentPriceChange,
      closePrice: metrics.currentPrice,
    };

    const result = {
      description,
      ...response.object,
      metrics: returnMetrics,
    };

    if (!result.report) {
      throw new Error("failed to generate report");
    }

    if (!result.description) {
      throw new Error("failed to generate description");
    }

    const translator = new deepl.Translator(process.env.DEEPL_API_KEY!);

    const allTranslatedDescription = await Promise.all([
      translator.translateText(result.description, null, "en-US").then((res) => res.text),
      translator.translateText(result.description, null, "ja").then((res) => res.text),
      translator.translateText(result.description, null, "zh").then((res) => res.text),
      translator.translateText(result.description, null, "fr").then((res) => res.text),
    ]);

    const allTranslatedReport = await Promise.all([
      translator.translateText(result.report, null, "ko").then((res) => res.text),
      translator.translateText(result.report, null, "ja").then((res) => res.text),
      translator.translateText(result.report, null, "zh").then((res) => res.text),
      translator.translateText(result.report, null, "fr").then((res) => res.text),
    ]);

    const isExist = await StockAnalysis.exists({ reutersCode: params.code });

    if (isExist) {
      const stockData = await StockAnalysis.findOneAndUpdate(
        { reutersCode: params.code },
        {
          reutersCode: params.code,
          symbolCode: stockInfoData.symbolCode,
          description: {
            ko: result.description,
            en: allTranslatedDescription[0],
            jp: allTranslatedDescription[1],
            ch: allTranslatedDescription[2],
            fr: allTranslatedDescription[3],
          },
          investmentIndex: result.investmentIndex,
          profitabilityPercentage: result.profitabilityPercentage,
          interestPercentage: result.interestPercentage,
          growthPercentage: result.growthPercentage,
          report: {
            ko: allTranslatedReport[0],
            en: result.report,
            jp: allTranslatedReport[1],
            ch: allTranslatedReport[2],
            fr: allTranslatedReport[3],
          },
          metrics: result.metrics,
        },
      );

      return Response.json({
        ok: true,
        stockData,
        message: "success update stock analysis data",
      });
    }

    const stockData = new StockAnalysis({
      reutersCode: params.code,
      symbolCode: stockInfoData.symbolCode,
      description: {
        ko: result.description,
        en: allTranslatedDescription[0],
        jp: allTranslatedDescription[1],
        ch: allTranslatedDescription[2],
        fr: allTranslatedDescription[3],
      },
      investmentIndex: result.investmentIndex,
      profitabilityPercentage: result.profitabilityPercentage,
      interestPercentage: result.interestPercentage,
      growthPercentage: result.growthPercentage,
      report: {
        ko: allTranslatedReport[0],
        en: result.report,
        jp: allTranslatedReport[1],
        ch: allTranslatedReport[2],
        fr: allTranslatedReport[3],
      },
      metrics: result.metrics,
    });

    await stockData.save();

    return Response.json({
      ok: true,
      message: "success save stock analysis data",
    });
  } catch (error) {
    console.error(error);
    return Response.error();
  } finally {
    await disconnectDB();
  }
};
