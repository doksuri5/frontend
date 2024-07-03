import Link from "next/link";

import CommonLayout from "../_components/CommonLayout";
import LoginForm from "../_components/LoginForm";
import SocialLogin from "../_components/SocialLogin";

import { cn } from "@/utils/cn";

import { ACCOUNT_PATH } from "@/routes/path";

export default function LoginPage() {
  return (
    <>
      <CommonLayout title="로그인">
        <LoginForm />
        <dl className={cn("flex_row justify-between")}>
          <dt className={cn("body_5 text-grayscale-900")}>아직 회원이 아니신가요?</dt>
          <dd>
            <Link href={ACCOUNT_PATH} className={cn("body_5 block py-[1.6rem] font-medium text-blue-600 underline")}>
              아잇나우 회원가입
            </Link>
          </dd>
        </dl>
        <SocialLogin />
      </CommonLayout>
    </>
  );
}
