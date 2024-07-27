import { getDetailInterestStocks } from "@/actions/stock";
import { StockItem } from "@/components/common";
import { cn } from "@/utils/cn";
import Image from "next/image";

const InterestStocks = async () => {
  const data = (await getDetailInterestStocks()).data;

  return (
    <div className="flex h-[40rem] flex-1 flex-col gap-[2.4rem]">
      <h2 className="heading_4 font-bold">관심 종목</h2>
      <div
        className={cn(
          "flex-1 overflow-auto rounded-[1.6rem] bg-white py-[1.2rem] pl-[2.4rem] pr-[3.2rem] scrollbar-hide",
          {
            "flex items-center justify-center": !data || data.length === 0,
          },
        )}
      >
        {!data || data.length === 0 ? (
          <div className="flex_row_col flex-1 gap-[1.3rem] rounded-[1.6rem] bg-white">
            <Image src="/icons/warning_icon.svg" alt="waring icon" width={50} height={50} />
            <p>관심 종목이 없습니다.</p>
          </div>
        ) : (
          data?.map((stock) => <StockItem variant="stock" key={stock.id} {...stock} />)
        )}
      </div>
    </div>
  );
};

export default InterestStocks;
