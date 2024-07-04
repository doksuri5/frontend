import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { name, email, password, phone, birth, nickname, interest_stocks, gender } = await request.json();

    // TODO: 데이터베이스에 사용자 등록 로직 추가
    // http://localhost:8080/api/auth/register

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error registering user:", error);
    return NextResponse.json({ success: false, message: "Registration failed" }, { status: 500 });
  }
}
