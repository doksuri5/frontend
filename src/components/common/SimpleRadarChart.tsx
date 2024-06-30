"use client";

import React, { useState, useEffect } from "react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts";

const data = [
  {
    id: "1",
    subject: "주가",
    A: 120,
    B: 110,
    fullMark: 150,
  },
  {
    id: "2",
    subject: "투자지수",
    A: 98,
    B: 130,
    fullMark: 150,
  },
  {
    id: "3",
    subject: "수익성",
    A: 86,
    B: 130,
    fullMark: 150,
  },
  {
    id: "4",
    subject: "성장성",
    A: 99,
    B: 100,
    fullMark: 150,
  },
  {
    id: "5",
    subject: "관심도",
    A: 85,
    B: 90,
    fullMark: 150,
  },
];

const SimpleRadarChart = () => {
  const [chartData, setChartData] = useState(data);

  useEffect(() => {
    // Add any side effects here
  }, []);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
        <PolarGrid />
        <PolarAngleAxis dataKey="id" fontSize={8} />
        <Radar dataKey="A" stroke="#00ACF2" fill="#B2E6FA" fillOpacity={0.6} />
      </RadarChart>
    </ResponsiveContainer>
  );
};

export default SimpleRadarChart;
