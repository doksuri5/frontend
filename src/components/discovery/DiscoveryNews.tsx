import { FindNews } from "../common";
import NewsImage from "@/public/icons/news.jpg";
import DiscoverySection from "./DiscoverySection";

const News = ({ param }: { param: string }) => {
  const newsList = [
    {
      idx: 1,
      image: NewsImage,
      title: "\"산유국 되나\" 尹 한 마디에 한국석유 또 '上'…석유주 훨훨",
      publishedTime: "n",
      newspaperCompany: "문화일보",
    },
    {
      idx: 2,
      image: NewsImage,
      title: "\"산유국 되나\" 尹 한 마디에 한국석유 또 '上'…석유주 훨훨",
      publishedTime: "n",
      newspaperCompany: "문화일보",
    },
    {
      idx: 3,
      image: NewsImage,
      title: "\"산유국 되나\" 尹 한 마디에 한국석유 또 '上'…석유주 훨훨",
      publishedTime: "n",
      newspaperCompany: "문화일보",
    },
    {
      idx: 4,
      image: NewsImage,
      title: "\"산유국 되나\" 尹 한 마디에 한국석유 또 '上'…석유주 훨훨",
      publishedTime: "n",
      newspaperCompany: "문화일보",
    },
    {
      idx: 5,
      image: NewsImage,
      title: "\"산유국 되나\" 尹 한 마디에 한국석유 또 '上'…석유주 훨훨",
      publishedTime: "n",
      newspaperCompany: "문화일보",
    },
    {
      idx: 6,
      image: NewsImage,
      title: "\"산유국 되나\" 尹 한 마디에 한국석유 또 '上'…석유주 훨훨",
      publishedTime: "n",
      newspaperCompany: "문화일보",
    },
  ];

  const subTag = <span className={`body_5 font-medium text-grayscale-600`}>{`(${newsList.length})`}</span>;

  return (
    <DiscoverySection title="뉴스" subTag={subTag}>
      <div className="flex_col h-vh gap-[1.6rem] rounded-[1.6rem] bg-white p-[2.4rem]">
        {newsList.map((news) => (
          <FindNews
            key={news.idx}
            image={news.image}
            title={news.title}
            publishedTime={news.publishedTime}
            newspaperCompany={news.newspaperCompany}
          />
        ))}
        <hr className="mb-[1.6rem] mt-[1.8rem]" />
        <p className="body_4 w-full cursor-pointer px-[1rem] text-center font-medium text-grayscale-400">더보기</p>
      </div>
    </DiscoverySection>
  );
};

export default News;
