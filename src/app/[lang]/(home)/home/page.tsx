import Image from "next/image";
import News from "./news";
import AiReports from "./_components/ai-reports";
import { getDetailInterestStocks } from "@/actions/stock";
import { StockItem } from "@/components/common";

const getInterestStocks = async () => {
  const res = await getDetailInterestStocks();

  return res.data;
};

export default async function HomePage() {
  const data = await getInterestStocks();

  return (
    <div className="flex h-full flex-col gap-[4.8rem] bg-background-100 pb-[10rem]">
      <AiReports />
      <section className="flex w-full gap-[2rem]">
        <div className="flex h-[40rem] flex-1 flex-col gap-[2.4rem]">
          <h2 className="heading_4 font-bold">최근 조회</h2>
          <div className="flex_row_col flex-1 gap-[1.3rem] rounded-[1.6rem] bg-white">
            <Image src="/icons/warning_icon.svg" alt="waring icon" width={50} height={50} />
            <p>최근 조회한 종목이 없습니다.</p>
          </div>
        </div>
        <div className="flex h-[40rem] flex-1 flex-col gap-[2.4rem]">
          <h2 className="heading_4 font-bold">관심 종목</h2>
          <div className="flex-1 overflow-auto rounded-[1.6rem] bg-white py-[1.2rem] pl-[2.4rem] pr-[3.2rem] scrollbar-hide">
            {!data ? (
              <div className="flex_row_col flex-1 gap-[1.3rem] rounded-[1.6rem] bg-white">
                <Image src="/icons/warning_icon.svg" alt="waring icon" width={50} height={50} />
                <p>관심 종목이 없습니다.</p>
              </div>
            ) : (
              data?.map((stock) => <StockItem variant="stock" key={stock.id} {...stock} />)
            )}
          </div>
        </div>
      </section>
      <News />
    </div>
  );
}
