import Card from "./Card";
import { CardNewsDataType } from "@/types";
import { useTranslations } from "next-intl";

type TPopularNewsType = {
  popularNewsData: CardNewsDataType[];
};

const PopularNews = ({ popularNewsData }: TPopularNewsType) => {
  const t = useTranslations();

  return (
    <div className="flex flex-col gap-[2.4rem]">
      <h2 className="heading_4 font-bold text-navy-900">
        {t("todaysPopularNews", { defaultMessage: "오늘 인기있는 뉴스" })}
      </h2>
      <div className="flex min-w-[120px] gap-[2rem]">
        <Card
          variant="fullMediaCard"
          _id={popularNewsData[0]._id}
          image={popularNewsData[0]?.image}
          title={popularNewsData[0].title}
          content={popularNewsData[0].description}
          date={popularNewsData[0].date}
          publisher={popularNewsData[0].publisher}
          style="w-1/2 h-full"
        />
        <div className="flex w-1/2 flex-col gap-[2rem]">
          <Card
            _id={popularNewsData[1]._id}
            image={popularNewsData[1]?.image}
            title={popularNewsData[1].title}
            content={popularNewsData[1].description}
            date={popularNewsData[1].date}
            publisher={popularNewsData[1].publisher}
            variant="fullMediaCard"
            size="small"
          />
          <Card
            _id={popularNewsData[2]._id}
            image={popularNewsData[2]?.image}
            title={popularNewsData[2].title}
            content={popularNewsData[2].description}
            date={popularNewsData[2].date}
            publisher={popularNewsData[2].publisher}
            variant="fullMediaCard"
            size="small"
          />
        </div>
      </div>
    </div>
  );
};

export default PopularNews;
