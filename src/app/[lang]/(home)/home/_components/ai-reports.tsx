"use client";

import { Button } from "@/components/common";
import SimpleReportCard from "@/components/common/SimpleReportCard";
import AIIcon from "@/public/icons/AI_icon.svg?component";

const AiReports = () => {
  return (
    <section className="flex flex-col gap-[2.4rem]">
      <div className="flex gap-4 pt-[9rem]">
        <h1 className="heading_4 font-bold">스팩님의 AI 리포트</h1>
        <Button variant="textButton" bgColor="bg-navy-900" className="h-[4rem] w-[8rem]">
          <AIIcon width={20} height={20} />
          AI
        </Button>
      </div>
      <div className="flex w-full gap-4">
        <SimpleReportCard reutersCode="AAPL.O" />
        <SimpleReportCard reutersCode="TSLA.O" />
        <SimpleReportCard reutersCode="AMZN.O" />
      </div>
    </section>
  );
};

export default AiReports;
