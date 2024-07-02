import { Button } from "@/components/common";
import Image from "next/image";

type TStockHeader = {
  data: { icon: string; stockKorName: string; stockEngName: string };
};

export default function ReportHeader({ data }: TStockHeader) {
  const { icon, stockKorName, stockEngName } = data;
  return (
    <section className="flex_row justify-between">
      <div className="flex items-center gap-[1.4rem]">
        <div className="relative h-[6.4rem] w-[6.4rem]">
          <Image src={icon} alt="stock-icon" style={{ width: "100%" }} />
        </div>
        <div className="flex_row gap-[0.8rem] text-navy-900">
          <h1 className="heading_4 font-bold">{stockKorName}</h1>
          <h1 className="body_2 font-normal">∙</h1>
          <h1 className="body_2 font-normal">{stockEngName}</h1>
        </div>
      </div>
      <Button variant="textButton" size="md" className="w-[18rem] text-white">
        관심종목 추가
      </Button>
    </section>
  );
}
