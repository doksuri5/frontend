import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import AiReports from "./_components/ai-reports";
import { i18n, Locale } from "@/i18n";
import ReportTitle from "./_components/report-title";
import { Button } from "@/components/common";
import AIIcon from "@/public/icons/AI_icon.svg?component";

export const revalidate = 1800;

export async function generateStaticParams() {
  return i18n.locales.map((lang) => ({ params: { lang } }));
}

export default async function HomeLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  unstable_setRequestLocale(params.lang);
  const t = await getTranslations("home");

  return (
    <div className="flex h-full flex-col bg-background-100 pb-[10rem]">
      <div className="flex gap-[4.8rem] pb-[2.4rem] pt-[9rem]">
        <ReportTitle title={t("aiReportFor")} />
        <Button variant="textButton" bgColor="bg-navy-900" className="h-[4rem] w-[8rem]">
          <AIIcon width={20} height={20} />
          {t("ai")}
        </Button>
      </div>
      <div className="flex w-full flex-col gap-[4.8rem]">
        <AiReports />
        {children}
      </div>
    </div>
  );
}
