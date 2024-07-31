import PopularInterestNews from "./popular-interest-news";
import { Suspense } from "react";
import RecentNews from "./recent-news";
import { auth } from "@/auth";
import { getTranslations } from "next-intl/server";
import { Skeleton } from "@/components/common";

const NewsBox = async () => {
  const session = await auth();
  const t = await getTranslations("home");

  return (
    <section>
      <h2 className="heading_4 pb-[2.4rem] font-bold">{t("newsForUser", { name: session?.user.name ?? "김스팩" })}</h2>
      <div className="flex flex-col rounded-[1.6rem] bg-white p-[4.8rem]">
        <Suspense fallback={<Skeleton className="h-[49rem] w-full" />}>
          <PopularInterestNews />
        </Suspense>
        <RecentNews />
      </div>
    </section>
  );
};

export default NewsBox;
