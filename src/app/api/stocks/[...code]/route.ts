import { NextRequest } from "next/server";

export const GET = async (request: NextRequest, { params }: { params: { code: string[] } }) => {
  const [reutersCode, type] = params.code;
  const searchParams = request.nextUrl.searchParams;
  const startDateTime = searchParams.get("startDateTime") ?? "202308010000";
  const endDateTime = searchParams.get("endDateTime") ?? "202407181725";

  if (!reutersCode || !type) {
    throw new Error(
      `path parameter is required in stocks/[...code] { code: [reutersCode = ${reutersCode}, type = ${type}] }`,
    );
  }

  const response = await fetch(
    `https://api.stock.naver.com/chart/foreign/item/${reutersCode}/${type}?startDateTime=${startDateTime}&endDateTime=${endDateTime}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch data in stocks/[code]");
  }

  const data = await response.json();

  return Response.json({
    data: data,
    ok: true,
  });
};
