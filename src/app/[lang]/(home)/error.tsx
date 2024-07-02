"use client";

import { Button } from "@/components/common";
import Image from "next/image";
import RefreshIcon from "@/public/icons/refresh_icon.svg?component";

export default function error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <section className="flex h-screen w-full items-center justify-center">
      <div className="flex flex-col items-center gap-[1.6rem] rounded-[3.2rem] bg-white px-[8.2rem] py-[8.3rem]">
        <Image src="/icons/warning_icon.svg" alt="waring icon" width={50} height={50} />
        <h4 className="heading_4 font-bold">홈에서 에러가 발생했습니다.</h4>
        <span className="body_3">다시 시도해 주세요.</span>
        <Button className="px-[16.5rem] py-[1.8rem]" bgColor="bg-navy-900 body_3" onClick={() => reset()}>
          <RefreshIcon width={20} height={20} />
          메인으로
        </Button>
      </div>
    </section>
  );
}
