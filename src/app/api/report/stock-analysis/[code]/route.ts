import type { NextRequest } from "next/server";
import { StockAnalysis } from "@/models/stock-analysis-schema";
import connectDB from "@/lib/db";

export const maxDuration = 30;

export const dynamic = "force-dynamic";

export const GET = async (request: NextRequest, { params }: { params: { code: string } }) => {
  try {
    await connectDB();
    const response = await StockAnalysis.findOne(
      { reutersCode: params.code },
      {
        _id: 0,
        reutersCode: 0,
        symbolCode: 0,
        createdAt: 0,
        updatedAt: 0,
        _v: 0,
      },
    );

    const stockAnalysis = response.toObject();

    if (!stockAnalysis) {
      return Response.error();
    }

    return Response.json({
      ok: true,
      data: [
        {
          ...stockAnalysis,
        },
      ],
    });
  } catch (error) {
    console.error(error);
    return Response.error();
  }
};
