import PopularInterestNews from "./popular-interest-news";
import { Suspense } from "react";
import RecentNews from "./recent-news";
import { Skeleton } from "@/components/common";

const NewsBox = () => {
  return (
    <section>
      <div className="flex flex-col rounded-[1.6rem] bg-white p-[4.8rem]">
        <Suspense fallback={<Skeleton className="h-[49rem] w-full" />}>
          <PopularInterestNews />
        </Suspense>
        <RecentNews />
      </div>
    </section>
  );
};

export default NewsBox;
