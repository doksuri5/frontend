import { useTranslations } from "next-intl";

import CommonLayout from "../_components/CommonLayout";
import CommonLoginBtn from "../_components/CommonLoginBtn";
import { CommonTitle } from "../_components";

export default function RegisterCompletePage() {
  const t = useTranslations("auth");
  return (
    <>
      <CommonLayout>
        <CommonTitle title={t("title.registrationComplete", { defaultMessage: "가입이 완료되었습니다." })} />
        <p className="body_2 text-center text-grayscale-900">
          {t("registerComplete.registrationComplete", { defaultMessage: "회원가입이 완료되었습니다." })}
          <br />
          {t("registerComplete.loginToContinue", { defaultMessage: "로그인 후 이용해주세요!" })}
        </p>
        <CommonLoginBtn className="mt-[5.6rem]" />
      </CommonLayout>
    </>
  );
}
