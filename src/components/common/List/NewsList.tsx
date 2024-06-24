import NewsItem, { TINewsItemProps } from "./NewsItem";
import { Fragment } from "react";

type TINewsListProps = {
  newsItemArray: TINewsItemProps[];
  lineBreak?: "lineBreak2" | "lineBreak4";
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

export default function NewsList({
  newsItemArray,
  lineBreak = "lineBreak2",
  variant = "border",
  style,
}: TINewsListProps) {
  const selectedVariantStyles = variantStyles[variant];

  return (
    <div className={`flex w-full flex-col ${selectedVariantStyles.border} ${style}`}>
      {newsItemArray.map((newsItem, index) => (
        <Fragment key={index}>
          <NewsItem
            image={newsItem.image}
            title={newsItem.title}
            description={newsItem.description}
            publishedTime={newsItem.publishedTime}
            newspaperCompany={newsItem.newspaperCompany}
            style={newsItem?.style}
            variant={lineBreak}
          />
          {index < newsItemArray.length - 1 && <Divider />}
        </Fragment>
      ))}
    </div>
  );
}
