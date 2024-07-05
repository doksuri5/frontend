"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import CommonLayout from "../../_components/CommonLayout";
import ProfileSetUpForm from "../../_components/ProfileSetUpForm";

import { MAIN_PATH, PROFILE_SETUP_PATH } from "@/routes/path";

export default function ProfileSetup() {
  const { data: session, status } = useSession();

  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;

    if (session?.user) {
      if (session.user.role === "user") {
        router.push(MAIN_PATH);
      } else {
        router.push(PROFILE_SETUP_PATH);
      }
    }
  }, [session, status, router]);
  return (
    <>
      <CommonLayout title="프로필 설정">
        <ProfileSetUpForm />
      </CommonLayout>
    </>
  );
}
