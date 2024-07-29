import PopularInterestNews from "./popular-interest-news";
import { Suspense } from "react";
import RecentNews from "./recent-news";
import { auth } from "@/auth";

const NewsBox = async () => {
  const session = await auth();

  return (
    <section>
      <h2 className="heading_4 pb-[2.4rem] font-bold">{session?.user.name ?? "김스팩"}님을 위한 주식 뉴스</h2>
      <div className="flex flex-col rounded-[1.6rem] bg-white p-[4.8rem]">
        <Suspense>
          <PopularInterestNews />
        </Suspense>
        <RecentNews />
      </div>
    </section>
  );
};

export default NewsBox;
