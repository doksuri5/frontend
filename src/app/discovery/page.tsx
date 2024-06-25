import {
  DiscoveryInput,
  DiscoveryNews,
  PopularSearches,
  RecentSearches,
  DiscoveryStocks,
} from "@/components/discovery";

type TDiscoveryProps = {
  searchParams: {
    search: string;
  };
};

export default function page({ searchParams }: TDiscoveryProps) {
  const param = searchParams.search;

  return (
    <article className="flex_col m-auto max-w-[59rem] gap-[3.2rem] py-[5.6rem]">
      <DiscoveryInput param={param} />
      {param ? (
        <>
          <DiscoveryStocks param={param} />
          <DiscoveryNews param={param} />
        </>
      ) : (
        <>
          <RecentSearches />
          <PopularSearches />
        </>
      )}
    </article>
  );
}
