import { useTranslations } from "next-intl";

import CommonLoginBtn from "../../_components/CommonLoginBtn";

import Image from "next/image";

export default function Page() {
  const t = useTranslations("auth.loginError");

  return (
    <>
      <section className="flex_col_center min-h-[calc(100vh-8rem)] pb-[10rem] pt-[10rem]">
        <div className="min-w-[59rem] rounded-[3.2rem] bg-grayscale-0 px-[10.2rem] py-[8rem]">
          <div className="flex_col_center">
            <Image src="/icons/warning_icon.svg" alt="waring icon" width={50} height={50} />
            <h4 className="heading_4 my-[] mb-[1.6rem] mt-[2.4rem] font-bold text-navy-900">
              {t("errorTitle", { defaultMessage: "로그인 오류" })}
            </h4>
            <p className="body_2 text-center font-medium text-navy-900">
              {t("temporaryError", { defaultMessage: "일시적인 오류로 인해 로그인에 실패하였습니다." })}
              <br />
              {t("tryAgain", { defaultMessage: "다시 한번 시도해주세요." })}
            </p>
            <CommonLoginBtn className="mt-[3.6rem]" />
          </div>
        </div>
      </section>
    </>
  );
}
