"use server";

import { cookies } from "next/headers";

export const getStockLangName = async () => {
  const cookieStore = cookies();
  const connectCookie = cookieStore.get("connect.sid")?.value;

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/stock/getStockLangName`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: `connect.sid=${connectCookie}`,
      },
      credentials: "include",
    });

    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
  }
};
