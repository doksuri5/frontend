import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";

import CommonLoginBtn from "./CommonLoginBtn";

import { FIND_PASSWORD_PATH } from "@/routes/path";

type TFindEmailCompleteProps = {
  responseData: {
    email: string;
    login_type: string;
    created_at: string;
  };
};

const dateFormat = (value: string) => {
  return value.split("T")[0].replaceAll("-", ". ");
};

export default function FindEmailComplete({ responseData }: TFindEmailCompleteProps) {
  const t = useTranslations("auth");
  const { email, login_type, created_at } = responseData;
  const loginTypeChk = login_type !== "local";
  return (
    <div>
      <p className="body_5 mb-[1.6rem] text-center font-medium text-grayscale-900">
        {t("findEmailComplete.emailMatchesPhone", { defaultMessage: "휴대폰번호와 일치하는 이메일입니다." })}
      </p>
      <div className="flex_col border-text-grayscale-300 gap-[1.6rem] rounded-[.8rem] border py-[2.8rem]">
        {loginTypeChk && (
          <p className="flex_row body_4 text-grayscale-900">
            <span className="inline-flex">
              <Image
                src={`/icons/icon_${login_type}.svg`}
                alt="SNS logo"
                width={20}
                height={20}
                className="mr-[.4rem]"
              />
            </span>
            {t("findEmailComplete.snsLogin", { defaultMessage: "SNS 로그인" })}
          </p>
        )}
        <p className="flex_row body_4 text-grayscale-900">
          {t("findEmailComplete.email", { defaultMessage: "이메일" })}: {email}
        </p>
        <p className="flex_row body_4 text-grayscale-900">
          {t("findEmailComplete.registrationDate", { defaultMessage: "가입일" })} :
          <span className="ml-[.8rem]">{dateFormat(created_at)}</span>
        </p>
      </div>
      <div className="flex_row_center mt-[5.6rem] gap-[1rem]">
        {!loginTypeChk && (
          <Link
            href={FIND_PASSWORD_PATH}
            className="body_3 box-border inline-flex h-[6.4rem] w-full items-center justify-center rounded-[0.8rem] border border-navy-900 bg-white px-[1rem] py-[1.8rem] font-medium text-navy-900"
          >
            {t("title.findPassword", { defaultMessage: "비밀번호 찾기" })}
          </Link>
        )}
        <CommonLoginBtn />
      </div>
    </div>
  );
}
