import Link from "next/link";
import { useTranslations } from "next-intl";

import CommonLayout from "../_components/CommonLayout";
import LoginForm from "../_components/LoginForm";
import SocialLogin from "../_components/SocialLogin";
import { CommonTitle } from "../_components";

import { cn } from "@/utils/cn";

import { ACCOUNT_PATH } from "@/routes/path";
import { unstable_setRequestLocale } from "next-intl/server";

export default function LoginPage({ params }: { params: { lang: string } }) {
  unstable_setRequestLocale(params.lang);

  const t = useTranslations("auth");
  return (
    <>
      <CommonLayout>
        <CommonTitle title={t("title.login", { defaultMessage: "로그인" })} />
        <LoginForm />
        <dl className={cn("flex_row justify-between")}>
          <dt className={cn("body_5 text-grayscale-900")}>
            {t("login.notMemberYet", { defaultMessage: "아직 회원이 아니신가요?" })}
          </dt>
          <dd>
            <Link href={ACCOUNT_PATH} className={cn("body_5 block py-[1.6rem] font-medium text-blue-600 underline")}>
              {t("login.signup", { defaultMessage: "아잇나우 회원가입" })}
            </Link>
          </dd>
        </dl>
        <SocialLogin />
      </CommonLayout>
    </>
  );
}
