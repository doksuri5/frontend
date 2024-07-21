"use server";

import { api } from "@/lib/api";
import { z } from "zod";
import { truncateBackstring } from "@/utils/truncateBackstring";
import { cookies } from "next/headers";

import { NewsDataType, SearchStockNewsSchema, SearchStockNewsDataType } from "@/types/NewsDataType2";

export const getSearchNews = api.get({
  endpoint: `/news/getSearchNews`,
  responseSchema: SearchStockNewsSchema,
})<undefined, SearchStockNewsDataType>;

export const fetchPopularNews = async () => {
  const cookieStore = cookies();
  const connectCookie = cookieStore.get("connect.sid")?.value;

  try {
    const response = await (
      await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/news/getTodayPopularNews`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: `connect.sid=${connectCookie}`,
        },
        credentials: "include",
      })
    ).json();

    if (response.ok) {
      let data = response.data;
      let refinedData = (data as any[]).map(
        ({ content_img, title, description, published_time, publisher, index }) => ({
          image: content_img,
          // TODO: 시간 포맷팅하기
          date: published_time,
          _id: index,
          title: title.ko,
          description: description.ko,
          publisher: publisher.ko,
        }),
      );
      return refinedData;
    }
  } catch (err) {
    console.error(err);
  }
};

export const fetchInterestStockNews = async () => {
  const cookieStore = cookies();
  const connectCookie = cookieStore.get("connect.sid")?.value;

  try {
    const response = await (
      await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/news/getInterestStockNews`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: `connect.sid=${connectCookie}`,
        },
        credentials: "include",
      })
    ).json();

    if (response.ok) {
      let data = response.data;

      if (data.length > 0) {
        let refinedData = (data as any[]).map(({ content_img, title, published_time, publisher, index }) => ({
          image: content_img,
          // TODO: 시간 포맷팅하기
          date: published_time,
          _id: index,
          title: title.ko,
          publisher: publisher.ko,
        }));

        return [refinedData[0], refinedData[1], refinedData[2]];
      } else return data;
    }
  } catch (err) {
    console.error(err);
  }
};

export const fetchRecentNews = async (pageParam = 1) => {
  const cookieStore = cookies();
  const connectCookie = cookieStore.get("connect.sid")?.value;

  try {
    const response = await (
      await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/news/getRecentNews?page=${pageParam}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: `connect.sid=${connectCookie}`,
        },
        credentials: "include",
      })
    ).json();

    if (response.ok) {
      let data = response.data;

      let refinedData = (data.recent_news as any[]).map(
        ({ content_img, title, published_time, publisher, index, content }) => ({
          image: content_img,
          // TODO:  시간 포맷팅하기
          date: published_time,
          _id: index,
          title: title.ko,
          publisher: publisher.ko,
          description: content.ko,
        }),
      );

      return { data: refinedData, page: data.now_page, totalPages: data.total_page };
    }
  } catch (err) {
    console.error(err);
  }
};

export const fetchNewsDetail = async (index: any) => {
  const cookieStore = cookies();
  const connectCookie = cookieStore.get("connect.sid")?.value;

  try {
    const response = await (
      await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/news/getNews/${index}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: `connect.sid=${connectCookie}`,
        },
        credentials: "include",
      })
    ).json();

    if (response.ok) {
      let news = response.data.news;
      let relatedNews = response.data.relative_news;
      let stockData = response.data.stock_data;

      let refinedNews = {
        image: news.content_img,
        // TODO: 시간 포맷팅하기
        publishedTime: news.published_time,
        _id: news.index,
        title: news.title.ko,
        description: truncateBackstring(news.content.ko),
        publisher: news.publisher.ko,
        view: news.view,
      };

      // 관련 뉴스 필드 정제
      let refinedRelatedNews = (relatedNews as any[]).map(({ index, publisher, published_time, title }) => ({
        _id: index,
        title: title.ko,
        publishedTime: published_time,
        newspaperCompany: publisher.ko,
      }));

      // 관련 주식 필드 정제
      let refinedStockData = (stockData as any[]).map(
        ({
          _id,
          stock_name,
          symbol_code,
          close_price,
          compare_to_previous_close_price,
          fluctuations_ratio,
          nation_type,
          reuters_code,
        }) => ({
          _id: _id,
          stockName: stock_name,
          symbolCode: symbol_code,
          closePrice: close_price,
          compareToPreviousClosePrice: compare_to_previous_close_price,
          fluctuationsRatio: fluctuations_ratio,
          nationType: nation_type,
          reutersCode: reuters_code,
        }),
      );

      return { news: refinedNews, relatedNews: refinedRelatedNews, relatedStocks: refinedStockData };
    }
  } catch (err) {
    console.error(err);
  }
};
