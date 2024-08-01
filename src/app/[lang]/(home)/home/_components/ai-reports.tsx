import SimpleReportCard from "@/components/common/SimpleReportCard";

const AiReports = () => {
  return (
    <section className="flex flex-col">
      <div className="flex w-full gap-4">
        <section className="h-[28rem] flex-1 rounded-[1.6rem] bg-white p-[3.2rem]">
          <SimpleReportCard reutersCode="AAPL.O" />
        </section>
        <section className="h-[28rem] flex-1 rounded-[1.6rem] bg-white p-[3.2rem]">
          <SimpleReportCard reutersCode="TSLA.O" />
        </section>
        <section className="h-[28rem] flex-1 rounded-[1.6rem] bg-white p-[3.2rem]">
          <SimpleReportCard reutersCode="AMZN.O" />
        </section>
      </div>
    </section>
  );
};

export default AiReports;
