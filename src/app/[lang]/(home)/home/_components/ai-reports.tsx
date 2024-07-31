import { auth } from "@/auth";
import { Button } from "@/components/common";
import SimpleReportCard from "@/components/common/SimpleReportCard";
import AIIcon from "@/public/icons/AI_icon.svg?component";
import { getTranslations } from "next-intl/server";

const AiReports = async () => {
  const session = await auth();
  const t = await getTranslations("home");

  return (
    <section className="flex flex-col gap-[2.4rem]">
      <div className="flex gap-4 pt-[9rem]">
        <h1 className="heading_4 font-bold">{t("aiReportFor", { name: session?.user.name ?? "스팩" })}</h1>
        <Button variant="textButton" bgColor="bg-navy-900" className="h-[4rem] w-[8rem]">
          <AIIcon width={20} height={20} />
          {t("ai")}
        </Button>
      </div>
      <div className="flex w-full gap-4">
        <section className="max-h-[28rem] flex-1 rounded-[1.6rem] bg-white p-[3.2rem]">
          <SimpleReportCard reutersCode="AAPL.O" />
        </section>
        <section className="max-h-[28rem] flex-1 rounded-[1.6rem] bg-white p-[3.2rem]">
          <SimpleReportCard reutersCode="TSLA.O" />
        </section>
        <section className="max-h-[28rem] flex-1 rounded-[1.6rem] bg-white p-[3.2rem]">
          <SimpleReportCard reutersCode="AMZN.O" />
        </section>
      </div>
    </section>
  );
};

export default AiReports;
