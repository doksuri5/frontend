import NewsItem, { TINewsItemProps } from "@/components/common/List/NewsItem";
import { NEWS_PATH } from "@/routes/path";
import { cn } from "@/utils/cn";
import Link from "next/link";
import { Fragment, useEffect, useRef } from "react";

type TINewsListProps = {
  newsItems: TINewsItemProps[] | undefined;
  lineClamp?: "lineClamp-2" | "lineClamp-4";
  variant?: "border" | "noBorder";
  style?: string;
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  status: string;
};

const variantStyles = {
  border: {
    border: "rounded-[32px] border border-solid border-navy-100 p-12 bg-white",
  },
  noBorder: {
    border: "",
  },
};

export default function NewsInfinityList({
  newsItems,
  lineClamp = "lineClamp-2",
  variant = "border",
  style,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  status,
}: TINewsListProps) {
  const selectedVariantStyles = variantStyles[variant];
  const observer = useRef<IntersectionObserver | null>(null);
  const lastNewsItemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1 },
    );

    if (lastNewsItemRef.current) {
      observer.current.observe(lastNewsItemRef.current);
    }

    return () => {
      if (observer.current && lastNewsItemRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.current.unobserve(lastNewsItemRef.current);
      }
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (status === "pending") {
    return <p>Loading...</p>;
  }

  return (
    <div
      className={cn(`flex w-full flex-col overflow-y-scroll scrollbar-hide ${selectedVariantStyles.border} ${style}`)}
    >
      {newsItems?.map((newsItem, index) => (
        <Link key={index} href={`${NEWS_PATH}/${newsItem.id}`}>
          <NewsItem
            id={newsItem.id}
            image={newsItem.image}
            title={newsItem.title}
            description={newsItem.description}
            publishedTime={newsItem.publishedTime}
            newspaperCompany={newsItem.newspaperCompany}
            style={newsItem.style}
            variant={lineClamp}
          />
          {index === newsItems.length - 1 && <div ref={lastNewsItemRef} />}
          {index < newsItems.length - 1 && <hr />}
        </Link>
      ))}
    </div>
  );
}
