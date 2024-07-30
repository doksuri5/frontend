import { fetchRecentNews } from "@/actions/news";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

const useInfiniteNews = () => {
  const { data: session } = useSession();
  const language = session?.user.language || "ko";

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useInfiniteQuery({
    queryKey: ["news", language],
    queryFn: ({ pageParam }) => fetchRecentNews(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage) {
        if (lastPage.totalPages === lastPage.page) return undefined;
        return lastPage.page + 1;
      }
    },
  });

  const newsData = data?.pages.flatMap((page) => page?.data) || [];

  return {
    newsData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  };
};

export default useInfiniteNews;
