"use client";

import {
  deleteInterestStock,
  getDetailInterestStocks,
  getStocksByReutersCode,
  insertInterestStock,
} from "@/actions/stock";
import { Button } from "@/components/common";
import { STOCK_NAMES, TReutersCodes } from "@/constants/stockCodes";
import { StockDataType } from "@/types";
import Image from "next/image";
import { useEffect, useState } from "react";
import ReportHeaderSkeleton from "./skeleton/ReportHeaderSkeleton";

type TStockHeader = {
  reutersCode: TReutersCodes;
};

export default function ReportHeader({ reutersCode }: TStockHeader) {
  const [stock, setStock] = useState<StockDataType>();
  const [isMyStockState, setIsMyStockState] = useState(false);

  const handleOnClick = async () => {
    if (isMyStockState) {
      const res = await deleteInterestStock(undefined, { params: reutersCode });
      if (!res.ok) {
        return;
      }
      setIsMyStockState(false);
    }
    if (!isMyStockState) {
      const res = await insertInterestStock({ reutersCode });
      if (!res.ok) {
        return;
      }
      setIsMyStockState(true);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getStocksByReutersCode(undefined, { params: reutersCode });
      const myStocks = await getDetailInterestStocks();

      if (!data.ok || !myStocks.ok) {
        return;
      }

      const item = myStocks.data.find((item) => reutersCode === item.reutersCode);

      if (item) {
        setIsMyStockState(true);
      }

      setStock(data.data);
    };

    fetchData();
  }, [reutersCode]);

  if (!stock) return <ReportHeaderSkeleton />;

  return (
    <section className="flex_row justify-between">
      <div className="flex items-center gap-[1.4rem]">
        <div className="relative h-[6.4rem] w-[6.4rem]">
          <Image src={`/icons/stocks/${STOCK_NAMES[reutersCode]}.svg`} alt="stock-icon" width={60} height={60} />
        </div>
        <div className="flex_row gap-[0.8rem] text-navy-900">
          <h1 className="heading_4 font-bold">{stock.stockName}</h1>
          <h1 className="body_2 font-normal">∙</h1>
          <h1 className="body_2 font-normal">{stock.symbolCode}</h1>
        </div>
      </div>
      {isMyStockState ? (
        <Button
          variant="textButton"
          size="md"
          className="w-[18rem] bg-transparent"
          bgColor="bg-white"
          onClick={handleOnClick}
        >
          관심종목 해제
        </Button>
      ) : (
        <Button variant="textButton" size="md" className="w-[18rem] text-white" onClick={handleOnClick}>
          관심종목 추가
        </Button>
      )}
    </section>
  );
}
