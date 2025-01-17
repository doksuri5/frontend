"use client";

import CommonLayout from "../_components/CommonLayout";

import { Button } from "@/components/common";
import { logoutAction } from "@/actions/auth-action";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { CommonTitle } from "../_components";

export default function WithdrawPage() {
  const router = useRouter();
  const t = useTranslations()

  const handleLogout = () => {
    router.replace('/');
    logoutAction();
  };

  return (
    <CommonLayout childrenClass="w-[39.4rem] flex_col_center">
      <CommonTitle title={t("withdraw.withdrawComplete", { defaultMessage: "회원탈퇴가 완료되었습니다." })} />
      <p className="body_2 text-center text-grayscale-900 whitespace-pre-wrap">
        {t('withdraw.thankYouMessage')}
      </p>
      <Button size="lg" className="mt-[5.6rem] w-[36.8rem] text-white" onClick={handleLogout}>
        {t("button.confirm")}
      </Button>
    </CommonLayout>
  );
}
