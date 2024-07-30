import { ExchangeDataType } from "@/types/StockDataType";
import dayjs from "dayjs";

export const dynamic = "force-dynamic";

// 하루에 한번만 호출되는 API
export const GET = async () => {
  try {
    const today = dayjs().format("YYYYMMDD");
    const selectedNations = ["CNH", "KRW", "JPY(100)", "EUR", "USD"];
    const response = await fetch(
      `https://www.koreaexim.go.kr/site/program/financial/exchangeJSON?authkey=${process.env.OPEN_API_CURRENCY}&searchdate=${today}&data=AP01`,
    );

    if (response.ok) {
      const data: ExchangeDataType[] = await response.json();

      const parseData = data
        .map((item) => ({
          nation: item.cur_unit,
          rate: item.deal_bas_r,
        }))
        .filter((rate) => selectedNations.includes(rate.nation));

      const results = await Promise.allSettled(
        parseData.map((item) =>
          fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/stocks/currency`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ...item,
            }),
          }),
        ),
      );

      if (results.some((result) => result.status === "rejected")) {
        console.error("Failed to save currency in DB");
      }

      return Response.json({
        status: 200,
      });
    }
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch in currency exchange");
  }
};
