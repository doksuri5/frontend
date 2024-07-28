import Link from "next/link";
import { useTranslations } from "next-intl";

import CommonLayout from "../_components/CommonLayout";
import CommonLoginBtn from "../_components/CommonLoginBtn";

import { FIND_EMAIL_PATH, LOGIN_PATH } from "@/routes/path";

export default function Page() {
  const t = useTranslations("auth");
  return (
    <>
      <CommonLayout
        title={t("exist.alreadyRegisteredEmail", { defaultMessage: "이미 가입된 이메일 입니다." })}
        childrenClass="min-w-[39.4rem] flex_col_center"
      >
        <p className="body_2 break-all text-center text-grayscale-900">
          {t("exist.snsSignupNotAllowed", { defaultMessage: "해당 SNS 계정으로는 회원가입이 불가합니다." })}
        </p>
        <p className="body_2 break-all text-center text-grayscale-900">
          {t("exist.checkAccountInfoThroughFindEmail", {
            defaultMessage: "이메일 찾기를 통해 계정 정보를 확인해주세요.",
          })}
        </p>
        <div className="flex_row_center mt-[5.6rem] w-[39.4rem] gap-[1rem]">
          <Link
            aria-label={t("title.login", { defaultMessage: "로그인" })}
            href={LOGIN_PATH}
            className="body_3 box-border inline-flex h-[6.4rem] w-full items-center justify-center rounded-[0.8rem] border border-navy-900 bg-white px-[1rem] py-[1.8rem] font-medium text-navy-900"
          >
            {t("title.login", { defaultMessage: "로그인" })}
          </Link>
          <CommonLoginBtn text={t("title.findEmail", { defaultMessage: "이메일 찾기" })} path={FIND_EMAIL_PATH} />
        </div>
      </CommonLayout>
    </>
  );
}
