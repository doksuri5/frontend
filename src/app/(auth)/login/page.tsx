import Link from "next/link";

import CommonLayout from "@/components/auth/CommonLayout";
import LoginForm from "@/components/auth/LoginForm";

import { Button } from "@/components/common";

import { cn } from "@/utils/cn";

import KakaoIcon from "@/public/icons/kakao_logo.svg?component";
import NaverIcon from "@/public/icons/naver_logo.svg?component";
import GoogleIcon from "@/public/icons/google_logo.svg?component";

const cssConfig = {
  lineBefore:
    "before:content-[''] before:absolute before:block before:top-[50%] before:translate-y-[-50%]  before:w-[calc(50%-2.9rem)] before:h-[.1rem] before:bg-grayscale-400",
  lineAfter:
    "after:content-[''] after:absolute before:block after:top-[50%] after:right-[0] after:translate-y-[-50%]  after:w-[calc(50%-2.9rem)] after:h-[.1rem] after:bg-grayscale-400",
};

export default function LoginPage() {
  return (
    <>
      <CommonLayout title="로그인">
        <LoginForm />
        <dl className={cn("flex_row justify-between")}>
          <dt className={cn("body_5 text-grayscale-900")}>아직 회원이 아니신가요?</dt>
          <dd className={cn("py-[1.6rem]")}>
            <Link href={"/agree"} className={cn("body_5 font-medium text-blue-600 underline")}>
              아잇나우 회원가입
            </Link>
          </dd>
        </dl>
        <div>
          <p
            className={cn(
              "body_5 relative mb-[1.6rem] w-full py-[1rem] text-center text-grayscale-600",
              cssConfig.lineBefore,
              cssConfig.lineAfter,
            )}
          >
            또는
          </p>
          <div className={cn("flex flex-col gap-[1.4rem]")}>
            <Button size="md" className={cn("gap-[1.6rem] bg-[#FEE500] font-medium text-[#000000D9]")}>
              <KakaoIcon />
              카카오 로그인
            </Button>
            <Button className={cn("gap-[1.6rem] bg-[#03C75A] font-medium text-white")}>
              <NaverIcon />
              네이버 로그인
            </Button>
            <Button
              className={cn(
                "gap-[1.6rem] border-[.1rem] border-[#E3E3E3] bg-grayscale-0 font-medium text-grayscale-900",
              )}
            >
              <GoogleIcon />
              Google 로그인
            </Button>
          </div>
        </div>
      </CommonLayout>
    </>
  );
}
