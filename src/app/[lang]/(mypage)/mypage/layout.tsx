import { Suspense, lazy } from "react";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
  const t = await getTranslations("mypage.metadata");

  return {
    title: t("title"),
    description: t("description"),
    keywords: t("keywords"),
    openGraph: {
      title: t("openGraph.title"),
      description: t("openGraph.description"),
    },
    twitter: {
      title: t("twitter.title"),
      description: t("twitter.description"),
    },
  };
}

const Navigation = lazy(() => import("./_components/Navigation"));

export default function Layout({ children }: { children: React.ReactNode }) {
  const t = useTranslations("header");

  return (
    <>
      <header className="heading_4 pb-[2rem] pt-[5.6rem] font-bold text-gray-900">
        {t("myPage", { defaultMessage: "마이페이지" })}
      </header>
      <div className="flex flex-row gap-[2.7rem] pb-[11.2rem]">
        <aside className="min-h-[72rem] min-w-[28.5rem] rounded-[1.6rem] bg-grayscale-0">
          <Suspense fallback={<div>Loading...</div>}>
            <Navigation />
          </Suspense>
        </aside>
        <main className="min-h-[72rem] flex-grow rounded-[1.6rem] bg-grayscale-0 p-[3.2rem]">{children}</main>
      </div>
    </>
  );
}
