"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import CommonLayout from "../../_components/CommonLayout";
import RegisterForm from "../../_components/RegisterForm";

import { MAIN_PATH, REGISTER_PATH } from "@/routes/path";

export default function RegisterPage() {
  const { data: session, status } = useSession();

  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;

    if (session?.user) {
      if (session.user.role === "user") {
        router.push(MAIN_PATH);
      } else {
        router.push(REGISTER_PATH);
      }
    }
  }, [session, status, router]);

  return (
    <>
      <CommonLayout title="회원가입">
        <RegisterForm />
      </CommonLayout>
    </>
  );
}
