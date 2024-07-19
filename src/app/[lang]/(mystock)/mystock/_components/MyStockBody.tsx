"use client";

import { useEffect } from "react";
import { MyStockItem } from "@/app/[lang]/(mystock)/mystock/_components";
import { useInterestStockStore } from "@/app/[lang]/(mystock)/mystock/stores";
import { StockDataType } from "@/types";
import WarningIcon from "@/public/icons/warning_icon.svg?component";

const MyStockBody = ({ dataList }: { dataList: StockDataType[] }) => {
  const { stockItemList, setStockItemList } = useInterestStockStore();

  useEffect(() => {
    setStockItemList(dataList);
  }, [dataList, setStockItemList]);

  return (
    <article className="pb-[5.6rem] pt-[2.4rem]">
      {/* 스켈레톤 추가 */}
      {stockItemList && stockItemList.length === 0 ? (
        <div className="flex_row_col mt-[15rem] gap-2">
          <WarningIcon />
          <p className="body_4 font-medium text-navy-900">관심 종목을 추가해주세요.</p>
        </div>
      ) : (
        <section className="grid w-full grid-cols-3 gap-x-[1.9rem] gap-y-[2.4rem]">
          {stockItemList.map((data) => (
            <MyStockItem key={data.id} data={data} />
          ))}
        </section>
      )}
    </article>
  );
};

export default MyStockBody;
