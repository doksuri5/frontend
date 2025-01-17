import { cn } from "@/utils/cn";
import NewsItem from "./NewsItem";
import { Fragment } from "react";
import { NewsDetailType } from "@/types";

type TINewsListProps = {
  newsItems: NewsDetailType[];
  lineClamp?: "lineClamp-2" | "lineClamp-4";
  variant?: "border" | "noBorder";
  style?: string;
};

const variantStyles = {
  border: {
    border: "rounded-[32px] border border-solid border-navy-100 p-12",
  },
  noBorder: { border: "" },
};

export default function NewsList({ newsItems, lineClamp = "lineClamp-2", variant = "border", style }: TINewsListProps) {
  const selectedVariantStyles = variantStyles[variant];

  return (
    <div className={cn(`flex w-full flex-col ${selectedVariantStyles.border} ${style}`)}>
      {newsItems.map((newsItem, index) => (
        <Fragment key={index}>
          <NewsItem
            image={newsItem.image}
            title={newsItem.title}
            description={newsItem.description}
            publishedTime={newsItem.publishedTime}
            publisher={newsItem.publisher}
            style={newsItem?.style}
            variant={lineClamp}
          />
          {index < newsItems.length - 1 && <hr />}
        </Fragment>
      ))}
    </div>
  );
}
