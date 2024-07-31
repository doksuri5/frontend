import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { DiscoverySection, PopularSearches, RecentSearches } from "./_components";
import { getPopularSearchesName } from "@/actions/search";
import { PopularSearchesNameDataType } from "@/types/SearchDataType";

export const dynamic = "force-dynamic";

export default async function Page({ params }: { params: { lang: string } }) {
  unstable_setRequestLocale(params.lang);
  const t = await getTranslations("discovery");

  const popularSearchesResult = await getPopularSearchesName();
  const popularSearches: PopularSearchesNameDataType[] = popularSearchesResult.ok ? popularSearchesResult.data : [];

  const getCurrentHourString = (): string => {
    const now = new Date();
    const hours = now.getHours();
    const formattedHour = hours.toString().padStart(2, "0");
    return `${formattedHour}:00`;
  };

  return (
    <>
      <DiscoverySection titleKey="recentSearchTitle" titleStyle="justify-between" sectionStyle="h-[27rem]">
        <RecentSearches />
      </DiscoverySection>
      <DiscoverySection
        titleKey="popularSearchTitle"
        sectionStyle="h-[29rem]"
        subTag={
          <span
            className={`body_5 font-medium text-grayscale-600 underline`}
          >{`${getCurrentHourString()} ${t("standard")}`}</span>
        }
      >
        <PopularSearches popularSearches={popularSearches} />
      </DiscoverySection>
    </>
  );
}
