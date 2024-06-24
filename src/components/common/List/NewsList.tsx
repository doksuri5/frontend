import { cn } from "@/utils/cn";
import NewsItem, { TINewsItemProps } from "./NewsItem";
import { Fragment } from "react";

type TINewsListProps = {
  newsItems: TINewsItemProps[];
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

const Divider = () => {
  return <hr className="my-[32px] border border-solid border-grayscale-400" />;
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
            newspaperCompany={newsItem.newspaperCompany}
            style={newsItem?.style}
            variant={lineClamp}
          />
          {index < newsItems.length - 1 && <Divider />}
        </Fragment>
      ))}
    </div>
  );
}
