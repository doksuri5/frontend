"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";

import { CommonTitle } from "../../_components";
import CommonLayout from "../../_components/CommonLayout";
import ProfileSetUpForm from "../../_components/ProfileSetUpForm";
import Loading from "../../_components/Loading";

import { HOME_PATH, PROFILE_SETUP_PATH } from "@/routes/path";
import { unstable_setRequestLocale } from "next-intl/server";

export default function ProfileSetup({ params }: { params: { lang: string } }) {
  unstable_setRequestLocale(params.lang);
  const { data: session, status } = useSession();
  const t = useTranslations("auth");

  const router = useRouter();

  useEffect(() => {
    if (!session || session.user.role !== "user") {
      router.push(PROFILE_SETUP_PATH);
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
    <>
      <CommonLayout>
        <CommonTitle title={t("title.profileSetup", { defaultMessage: "프로필 설정" })} />
        <ProfileSetUpForm />
      </CommonLayout>
    </>
  );
}
