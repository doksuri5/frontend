import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  const body = await req.json();

  const res = await fetch("http://43.203.238.76:8000/auth/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams(body),
  });

  const data = await res.json();

  if (!data.access_token) {
    return Response.error();
  }

  return Response.json(data);
};
