"use client";

import { StockItemSkeleton } from "@/components/common";
import StockItem from "@/components/common/List/StockItem";
import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";

export default function RelatedStocks({ relatedStocks }: any) {
  const [stockData, setStockData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const t = useTranslations();

  useEffect(() => {
    setStockData(relatedStocks);
    setLoading(false);
  }, [relatedStocks]);

  return (
    <section className="min-h-[31rem] min-w-[38.4rem] rounded-[1.6rem] bg-white p-[3.2rem]">
      <h2 className="body_3 pb-[1rem] font-bold text-navy-900">
        {t("news.relatedStocks", { defaultMessage: "현재 뉴스와 관련된 주식" })}
      </h2>
      <div className="flex flex-col gap-[0.8rem]">
        {loading &&
          Array(4)
            .fill(0)
            .map((_, index) => <StockItemSkeleton variant="findStock" key={index} />)}
        {!loading &&
          stockData.map((stock) => <StockItem variant="findStock" key={stock._id} {...stock} style="w-full" />)}
      </div>
    </section>
  );
}
