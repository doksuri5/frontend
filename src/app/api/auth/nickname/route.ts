import { NextResponse } from "next/server";

import connectDB from "@/lib/db";
import { User } from "@/lib/schema";

export const POST = async (request: Request) => {
  const { nickname } = await request.json();

  try {
    await connectDB();
  } catch (error) {
    console.error("DB 연결 오류:", error);
    return new NextResponse(JSON.stringify({ message: "Database connection error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  const existingUser = await User.findOne({ nickname, is_delete: false }, { nickname: 1 });

  if (existingUser) {
    return new NextResponse(
      JSON.stringify({ message: "중복된 닉네임입니다. 다른 닉네임을 사용해주세요.", ok: false }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  } else {
    return new NextResponse(JSON.stringify({ message: "사용가능한 닉네임 입니다.", ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }
};
