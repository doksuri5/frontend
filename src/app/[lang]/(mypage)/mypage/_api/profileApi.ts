"use server";

import { cookies } from "next/headers";

export async function updateUserProfile(formData: FormData) {
  const cookieStore = cookies();
  const connectCookie = cookieStore.get("connect.sid")?.value;

  if (connectCookie !== undefined) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user/updateUserProfile`, {
      method: "PUT",
      headers: {
        Cookie: `connect.sid=${connectCookie}`,
      },
      credentials: "include",
      body: formData,
    });
    const data = await response.json();
    return data;
  }
}
