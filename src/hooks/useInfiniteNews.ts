import { fetchRecentNews } from "@/actions/news";
import { useInfiniteQuery } from "@tanstack/react-query";

const useInfiniteNews = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useInfiniteQuery({
    queryKey: ["news"],
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
