import { NextRequest } from "next/server";
import yahooFinance from "yahoo-finance2";

export const dynamic = "force-dynamic";

export const GET = async (request: NextRequest, { params }: { params: { reutersCode: string } }) => {
  const { reutersCode } = params;
  try {
    if (!reutersCode) {
      throw new Error("path parameter is required in stock/[reutersCode = undefined]");
    }
    const symbolCode = reutersCode.replace(".O", "");

    const quoteSummary = await yahooFinance.quoteSummary(symbolCode, {
      modules: ["price"],
    });

    const data = {
      symbolCode: quoteSummary.price?.symbol,
      closePrice: quoteSummary.price?.regularMarketPrice,
      fluctuationsRatio: (quoteSummary.price?.regularMarketChangePercent ?? 0) * 100,
      compareToPreviousClosePrice: quoteSummary.price?.regularMarketChange,
    };

    return Response.json({ ok: true, data });
  } catch (error) {
    return Response.json({ ok: false, message: "fetch failed from api/stock/[reutersCode]" });
  }
};
