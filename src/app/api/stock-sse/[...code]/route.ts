import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export const GET = async (request: NextRequest, { params }: { params: { code: string[] } }) => {
  const [reutersCode, type] = params.code;

  if (!reutersCode || !type) {
    throw new Error(
      `path parameter is required in stocks/[...code] { code: [reutersCode = ${reutersCode}, type = ${type}] }`,
    );
  }

  try {
    const interval = 10000;
    let keepAlive = true;

    const encoder = new TextEncoder();

    const fetchStockData = async () => {
      const response = await fetch(`https://api.stock.naver.com/chart/foreign/item/${reutersCode}/${type}`);
      if (!response.ok) {
        throw new Error("Failed to fetch data in stocks/[code]");
      }
      const data = await response.json();
      return data;
    };

    const customReadable = new ReadableStream({
      start(controller) {
        const sendStockData = async () => {
          try {
            const data = await fetchStockData();
            const message = JSON.stringify(data[0]);
            controller.enqueue(encoder.encode(`data: ${message}\n\n`));
          } catch (error) {
            controller.error(error);
          }

          if (keepAlive) {
            setTimeout(sendStockData, interval);
          } else {
            controller.close();
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
    return Response.json({ ok: false, message: "fetch failed from api/stocks/[...code]" });
  }
};
