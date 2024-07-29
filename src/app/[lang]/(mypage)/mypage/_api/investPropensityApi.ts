"use server";

import { cookies } from "next/headers";

export const modifyPropensity = async (data: any) => {
  const cookieStore = cookies();
  const connectCookie = cookieStore.get("connect.sid")?.value;

  try {
    await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/propensity/updatePropensity`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Cookie: `connect.sid=${connectCookie}`,
      },
      body: JSON.stringify(data),
      credentials: "include",
    });
  } catch (err) {
    console.error(err);
  }
};
