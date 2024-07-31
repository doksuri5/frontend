import { getDetailInterestStocks } from "@/actions/stock";
import { StockItem } from "@/components/common";
import { cn } from "@/utils/cn";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

const InterestStocks = async () => {
  const t = await getTranslations("home");
  const data = (await getDetailInterestStocks()).data;

  return (
    <div className="flex h-[40rem] flex-1 flex-col gap-[2.4rem]">
      <h2 className="heading_4 font-bold">{t("interestStocks")}</h2>
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
            <p>{t("notFoundInterestStocks")}</p>
          </div>
        ) : (
          data?.map((stock) => <StockItem variant="stock" key={stock.id} {...stock} />)
        )}
      </div>
    </div>
  );
};

export default InterestStocks;
