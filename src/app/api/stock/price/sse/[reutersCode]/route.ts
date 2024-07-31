import { NextRequest } from "next/server";
import yahooFinance from "yahoo-finance2";

export const dynamic = "force-dynamic";
export const maxDuration = 300;

export const GET = async (request: NextRequest, { params }: { params: { reutersCode: string } }) => {
  const { reutersCode } = params;
  try {
    if (!reutersCode) {
      throw new Error("path parameter is required in stock/[reutersCode = undefined]");
    }

    const interval = 10000;
    const symbolCode = reutersCode.replace(".O", "");

    const encoder = new TextEncoder();

    const fetchStockPrice = async () => {
      try {
        const quoteSummary = await yahooFinance.quoteSummary(symbolCode, {
          modules: ["price"],
        });

        const data = {
          symbolCode: quoteSummary.price?.symbol,
          closePrice: quoteSummary.price?.regularMarketPrice,
          fluctuationsRatio: (quoteSummary.price?.regularMarketChangePercent ?? 0) * 100,
          compareToPreviousClosePrice: quoteSummary.price?.regularMarketChange,
        };
        return data;
      } catch (error) {
        console.error(error);
      }
    };

    let keepAlive = true;

    const customReadable = new ReadableStream({
      start(controller) {
        const sendStockData = async () => {
          try {
            const data = await fetchStockPrice();
            const message = JSON.stringify(data);

            controller.enqueue(encoder.encode(`data: ${message}\n\n`));
          } catch (error) {
            controller.error(error);
          }

          if (keepAlive) {
            setTimeout(sendStockData, interval);
          }
        };

        sendStockData();
      },
      cancel() {
        keepAlive = false;
      },
    });

    return new Response(customReadable, {
      headers: {
        Connection: "keep-alive",
        "Content-Encoding": "none",
        "Cache-Control": "no-cache, no-transform",
        "Content-Type": "text/event-stream; charset=utf-8",
      },
    });
  } catch (error) {
    return Response.json({ ok: false, message: "fetch failed from api/stock/[reutersCode]" });
  }
};
