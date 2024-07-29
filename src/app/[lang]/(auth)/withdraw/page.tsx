"use client";

import CommonLayout from "../_components/CommonLayout";

import { Button } from "@/components/common";
import { logoutAction } from "@/actions/auth-action";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

export default function WithdrawPage() {
  const router = useRouter();
  const t = useTranslations()

  const handleLogout = () => {
    router.replace('/');
    logoutAction();
  };

  return (
    <CommonLayout title={t("withdraw.withdrawComplete", { defaultMessage: "회원탈퇴가 완료되었습니다." })} childrenClass="w-[39.4rem] flex_col_center">
      <p className="body_2 text-center text-grayscale-900">
        {t('withdraw.thankYouPartOne')}
        <br />
        {t('withdraw.thankYouPartTwo')}
      </p>
      <Button size="lg" className="mt-[5.6rem] w-[36.8rem] text-white" onClick={handleLogout}>
        {t("button.confirm")}
      </Button>
    </CommonLayout>
  );
}
