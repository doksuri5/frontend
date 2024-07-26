import { StockOverViewDataType } from "@/types/StockDataType";
import { NextRequest } from "next/server";

export const GET = async (request: NextRequest, { params }: { params: { reutersCode: string } }) => {
  try {
    const { reutersCode } = params;

    const response = await fetch(`https://api.stock.naver.com/stock/${reutersCode}/integration`);
    const data = await response.json();

    // corporateOverview 의 텍스트 수를 제한하기 위해 substring을 사용하였습니다.
    const stockOverView: StockOverViewDataType = {
      corporateOverview: data.corporateOverview,
      summaries: {
        summary: data.summaries.summary,
        representativeName: data.summaries.representativeName,
        representativeId: data.summaries.representativeId,
        nation: data.summaries.nation,
        employees: data.summaries.employees,
        employeesLastUpdated: data.summaries.employeesLastUpdated,
        city: data.summaries.city,
        address: data.summaries.address,
        url: data.summaries.url,
      },
    };

    return Response.json({
      data: stockOverView,
      ok: true,
    });
  } catch (error) {
    throw new Error("Failed to fetch stock description");
  }
};
