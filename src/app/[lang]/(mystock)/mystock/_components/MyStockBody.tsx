import { MyStockItem } from "@/app/[lang]/(mystock)/mystock/_components";
import { StockDataType } from "@/types";
import WarningIcon from "@/public/icons/warning_icon.svg?component";
import { Suspense } from "react";
import MyStockItemSkeleton from "./_skeleton/MyStockItemSkeleton";

const MyStockBody = ({ dataList }: { dataList: StockDataType[] }) => {
  return (
    <article className="pb-[5.6rem] pt-[2.4rem]">
      <Suspense
        fallback={Array.from({ length: 3 }).map((_, idx) => (
          <MyStockItemSkeleton key={idx} />
        ))}
      >
        {dataList && dataList.length === 0 ? (
          <div className="flex_row_col mt-[15rem] gap-2">
            <WarningIcon />
            <p className="body_4 font-medium text-navy-900">관심 종목을 추가해주세요.</p>
          </div>
        ) : (
          <section className="grid w-full grid-cols-3 gap-x-[1.9rem] gap-y-[2.4rem]">
            {dataList.map((data) => (
              <MyStockItem key={data.id} data={data} />
            ))}
          </section>
        )}
      </Suspense>
    </article>
  );
};

export default MyStockBody;
