import NewsItem from "@/components/common/List/NewsItem";
import NewsItemSkeleton from "@/components/common/skeleton/NewsItemSkeleton";
import { cn } from "@/utils/cn";
import { Fragment, useEffect, useRef } from "react";

type TINewsListProps = {
  newsItems: any;
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

  return (
    <div
      className={cn(`flex w-full flex-col overflow-y-scroll scrollbar-hide ${selectedVariantStyles.border} ${style}`)}
    >
      {status === "pending" &&
        Array(4)
          .fill(0)
          .map((_, index) => (
            <Fragment key={index}>
              <NewsItemSkeleton variant={lineClamp} /> {index < 3 && <hr />}
            </Fragment>
          ))}
      {newsItems &&
        newsItems.map((newsItem: any, index: any) => (
          <Fragment key={newsItem._id}>
            <NewsItem
              _id={newsItem._id}
              image={newsItem.image}
              title={newsItem.title}
              description={newsItem.description}
              publishedTime={newsItem.publishedTime}
              publisher={newsItem.publisher}
              variant={lineClamp}
            />
            {index === newsItems.length - 1 && <div ref={lastNewsItemRef} />}
            {index < newsItems.length - 1 && <hr />}
          </Fragment>
        ))}
    </div>
  );
}
