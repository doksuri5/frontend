import { NextResponse } from "next/server";

import connectDB from "@/lib/db";
import { User } from "@/lib/schema";

interface IUser {
  sns_id: string;
  name: string;
  email: string;
  password?: string;
  birth: string;
  phone: string;
  gender: "M" | "F" | null;
  profile: string;
  nickname: string;
  language: "ko" | "en" | "ch" | "jp" | "fr";
  login_type: string;
  is_delete: boolean;
  created_at: Date;
  updated_at: Date;
}

export const POST = async (request: Request) => {
  const { name, phone } = await request.json();

  try {
    await connectDB();
  } catch (error) {
    console.error("DB 연결 오류:", error);
    return new NextResponse(JSON.stringify({ message: "Database connection error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  const user: IUser | null = await User.findOne(
    { name, phone, is_delete: false },
    { email: 1, login_type: 1, created_at: 1 },
  );

  if (user) {
    return new NextResponse(
      JSON.stringify({
        ok: true,
        data: { email: user.email, login_type: user.login_type, created_at: user.created_at },
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  } else {
    return new NextResponse(JSON.stringify({ ok: false, message: "등록되지 않은 회원이거나 잘못된 회원정보입니다." }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }
};
