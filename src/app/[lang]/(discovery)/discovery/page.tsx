import { getTranslations } from "next-intl/server";
import { DiscoverySection, PopularSearches, RecentSearches } from "./_components";
import { getPopularSearchesName, getRecentSearches } from "@/actions/search";
import { PopularSearchesNameDataType, SearchTextDataType } from "@/types/SearchDataType";

const getCurrentHourString = (): string => {
  const now = new Date();
  const hours = now.getHours();
  const formattedHour = hours.toString().padStart(2, "0");
  return `${formattedHour}:00`;
};

export default async function Page() {
  const t = await getTranslations("discovery");

  const [recentSearchesResult, popularSearchesResult] = await Promise.allSettled([
    getRecentSearches(undefined),
    getPopularSearchesName(),
  ]);

  const recentSearches: SearchTextDataType[] =
    recentSearchesResult.status === "fulfilled" && recentSearchesResult.value.ok ? recentSearchesResult.value.data : [];
  const popularSearches: PopularSearchesNameDataType[] =
    popularSearchesResult.status === "fulfilled" && popularSearchesResult.value.ok
      ? popularSearchesResult.value.data
      : [];

  return (
    <>
      <DiscoverySection titleKey="recentSearchTitle" titleStyle="justify-between" sectionStyle="h-[27rem]">
        <RecentSearches recentSearches={recentSearches} />
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
