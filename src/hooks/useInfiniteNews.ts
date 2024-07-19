import { fetchRecentNews } from "@/actions/news";
import { useInfiniteQuery } from "@tanstack/react-query";

const useInfiniteNews = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useInfiniteQuery({
    queryKey: ["news"],
    queryFn: ({ pageParam = 1 }) => fetchRecentNews(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage) {
        if (lastPage.totalPages === lastPage.page) return undefined;
        return lastPage.page + 1;
      }
    },
  });

  const allNews = data?.pages[0];

  return {
    allNews,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  };
};

export default useInfiniteNews;
