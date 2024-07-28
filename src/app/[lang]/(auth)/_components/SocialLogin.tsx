"use client";

import { Button } from "@/components/common";

import { cn } from "@/utils/cn";

import KakaoIcon from "@/public/icons/kakao_logo.svg?component";
import NaverIcon from "@/public/icons/naver_logo.svg?component";
import GoogleIcon from "@/public/icons/google_logo.svg?component";

import { SocialLoginAction } from "@/actions/auth-action";

import { PROFILE_SETUP_PATH, REGISTER_PATH } from "@/routes/path";

const cssConfig = {
  lineBefore:
    "before:content-[''] before:absolute before:block before:top-[50%] before:translate-y-[-50%]  before:w-[calc(50%-2.9rem)] before:h-[.1rem] before:bg-grayscale-400",
  lineAfter:
    "after:content-[''] after:absolute before:block after:top-[50%] after:right-[0] after:translate-y-[-50%]  after:w-[calc(50%-2.9rem)] after:h-[.1rem] after:bg-grayscale-400",
};

export default function SocialLogin() {
  const handleSocialLogin = async (provider: string) => {
    const redirectTo = provider === "naver" ? PROFILE_SETUP_PATH : REGISTER_PATH;
    await SocialLoginAction(provider, redirectTo);
  };

  return (
    <>
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
        <Button
          type="button"
          size="md"
          className={cn("gap-[1.6rem] bg-[#FEE500] font-medium text-[#000000D9]")}
          onClick={() => handleSocialLogin("kakao")}
        >
          <KakaoIcon />
          카카오 로그인
        </Button>
        <Button
          type="button"
          className={cn("gap-[1.6rem] bg-[#03C75A] font-medium text-white")}
          onClick={() => handleSocialLogin("naver")}
        >
          <NaverIcon />
          네이버 로그인
        </Button>
        <Button
          type="button"
          className={cn("gap-[1.6rem] border-[.1rem] border-[#E3E3E3] bg-grayscale-0 font-medium text-grayscale-900")}
          onClick={() => handleSocialLogin("google")}
        >
          <GoogleIcon />
          Google 로그인
        </Button>
      </div>
    </>
  );
}
