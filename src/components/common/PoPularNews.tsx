import { NEWS_PATH } from "@/routes/path";
import Card from "./Card";
import Link from "next/link";
import useDictionary from "@/hooks/useDictionary";

const PopularNews = () => {
  const { dictionary } = useDictionary();

  return (
    <div className="flex flex-col gap-[2.4rem]">
      <h2 className="heading_4 font-bold text-navy-900">
        {(dictionary && dictionary.todaysPopularNews) || "오늘 인기있는 뉴스"}
      </h2>
      <div className="flex min-w-[120px] gap-[2rem]">
        <Link href={`${NEWS_PATH}/1`}>
          <Card
            image="/icons/news.jpg"
            variant="fullMediaCard"
            title="엔비디아 또 신고가… 시총 2위 애플과 962억달러 차이"
            content="엔비디아가 기존 주식을 10주로 쪼개는 액면분할을 3일 앞둔 4일(현지시간) 주당 신고가 기록을 다시 쓰며 고가 우려를 털어냈다. 차세대 인공지능(AI) GPU 발표..."
            date="2024.06.05"
            publisher="문화일보"
            style="w-1/2"
          />
        </Link>
        <div className="flex w-1/2 flex-col gap-[2rem]">
          <Link href={`${NEWS_PATH}/2`}>
            <Card
              image="/icons/news.jpg"
              variant="fullMediaCard"
              title="엔비디아 또 신고가… 시총 2위 애플과 962억달러 차이"
              content="엔비디아가 기존 주식을 10주로 쪼개는 액면분할을 3일 앞둔 4일(현지시간) 주당 신고가 기록을 다시 쓰며 고가 우려를 털어냈다. 차세대 인공지능(AI) GPU 발표..."
              date="2024.06.05"
              publisher="문화일보"
              size="small"
            />
          </Link>
          <Link href={`${NEWS_PATH}/3`}>
            <Card
              image="/icons/news.jpg"
              variant="fullMediaCard"
              title="엔비디아 또 신고가… 시총 2위 애플과 962억달러 차이"
              content="엔비디아가 기존 주식을 10주로 쪼개는 액면분할을 3일 앞둔 4일(현지시간) 주당 신고가 기록을 다시 쓰며 고가 우려를 털어냈다. 차세대 인공지능(AI) GPU 발표..."
              date="2024.06.05"
              publisher="문화일보"
              size="small"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PopularNews;
