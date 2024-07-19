"use client";

import { StockAIReportDataType } from "@/types/StockDataType";
import React, { useState, useEffect } from "react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts";

const parseData = (
  data: Pick<
    StockAIReportDataType,
    "investmentIndex" | "profitabilityPercentage" | "growthPercentage" | "interestPercentage" | "metrics"
  >,
) => {
  const { investmentIndex, profitabilityPercentage, growthPercentage, interestPercentage, metrics } = data;

  return [
    {
      id: "1",
      subject: "주가",
      A: metrics.closePriceChange * 10,
      fullMark: 100,
    },
    {
      id: "2",
      subject: "투자지수",
      A: investmentIndex,
      fullMark: 100,
    },
    {
      id: "3",
      subject: "수익성",
      A: profitabilityPercentage,
      fullMark: 100,
    },
    {
      id: "4",
      subject: "성장성",
      A: growthPercentage,
      fullMark: 100,
    },
    {
      id: "5",
      subject: "관심도",
      A: interestPercentage,
      fullMark: 100,
    },
  ];
};

const SimpleRadarChart = ({ data }: { data: StockAIReportDataType }) => {
  const parsedData = parseData(data);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={parsedData}>
        <PolarGrid />
        <PolarAngleAxis dataKey="id" fontSize={8} />
        <Radar dataKey="A" stroke="#00ACF2" fill="#B2E6FA" fillOpacity={0.6} />
      </RadarChart>
    </ResponsiveContainer>
  );
};

export default SimpleRadarChart;
