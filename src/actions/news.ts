"use server";

import { api } from "@/lib/api";
import { z } from "zod";
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

      let refinedData = (data as any[]).map(({ content_img, title, published_time, publisher, index }) => ({
        image: content_img,
        // TODO: 시간 포맷팅하기
        date: published_time,
        _id: index,
        title: title.ko,
        publisher: publisher.ko,
      }));

      return [refinedData[0], refinedData[1], refinedData[2]];
    }
  } catch (err) {
    console.error(err);
  }
};
