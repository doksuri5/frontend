import { getTranslations } from "next-intl/server";
import { MyStockItem } from "@/app/[lang]/(mystock)/mystock/_components";
import { StockDataType } from "@/types";
import WarningIcon from "@/public/icons/warning_icon.svg?component";

const MyStockBody = async ({ dataList }: { dataList: StockDataType[] }) => {
  const t = await getTranslations("myStock");

  return (
    <article className="pb-[5.6rem] pt-[2.4rem]">
      {dataList && dataList.length === 0 ? (
        <div className="flex_row_col mt-[15rem] gap-2">
          <WarningIcon />
          <p className="body_4 font-medium text-navy-900">{t("noneStock")}</p>
        </div>
      ) : (
        <section className="grid w-full grid-cols-3 gap-x-[1.9rem] gap-y-[2.4rem]">
          {dataList.map((data) => (
            <MyStockItem key={data.id} data={data} />
          ))}
        </section>
      )}
    </article>
  );
};

export default MyStockBody;
