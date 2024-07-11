"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import CommonLayout from "../../_components/CommonLayout";
import RegisterForm from "../../_components/RegisterForm";
import Loading from "../../_components/Loading";

import { HOME_PATH, REGISTER_PATH } from "@/routes/path";

export default function RegisterPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session || session.user.role !== "user") {
      router.push(REGISTER_PATH);
    } else if (session.user.role === "user") {
      router.push(HOME_PATH);
    }
  }, [session, status, router]);

  if (status === "loading") {
    return <Loading />;
  }

  // 소설 session 존재, 가입된 유저의 경우 null 처리로 아무것도 렌더링 하지 않도록 처리
  if (session?.user?.role === "user") {
    return null;
  }

  return (
    <CommonLayout title="회원가입">
      <RegisterForm />
    </CommonLayout>
  );
}
