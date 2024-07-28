import { getTranslations } from "next-intl/server";
import { DiscoveryInput, DiscoveryParams, DiscoverySection, PopularSearches, RecentSearches } from "./_components";
import { getPopularSearchesName, getRecentSearches } from "@/actions/search";
import { PopularSearchesNameDataType, SearchTextDataType } from "@/types/SearchDataType";

const getCurrentHourString = (): string => {
  const now = new Date();
  const hours = now.getHours();
  const formattedHour = hours.toString().padStart(2, "0");
  return `${formattedHour}:00`;
};

type TDiscoveryProps = {
  searchParams: {
    search: string;
  };
};
export default async function Page({ searchParams }: TDiscoveryProps) {
  const t = await getTranslations("discovery");
  const params = searchParams.search;

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
    <article className="flex_col m-auto max-w-[59rem] gap-[3.2rem] py-[5.6rem]">
      <DiscoveryInput />
      {params && params.trim() !== "" ? (
        <DiscoveryParams params={params} />
      ) : (
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
      )}
    </article>
  );
}
