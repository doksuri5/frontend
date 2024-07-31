import { StockDataType } from "@/types";
import MyStockFooter from "./MyStockFooter";
import SimpleReportCard from "@/components/common/SimpleReportCard";

type TMyStockItemProps = {
  data: StockDataType;
};

const MyStockItem = ({ data }: TMyStockItemProps) => {
  return (
    <div className="flex flex-col justify-start gap-2 rounded-[1.6rem] bg-white px-[3.2rem] py-[3rem]">
      <SimpleReportCard isShowHeader={true} titleSize="lg" reutersCode={data.reutersCode} />
      <MyStockFooter reutersCode={data.reutersCode} />
    </div>
  );
};

export default MyStockItem;
