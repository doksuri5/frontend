"use client";

import { Button } from "@/components/common";
import Image from "next/image";
import RefreshIcon from "@/public/icons/refresh_icon.svg?component";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html className="h-full w-full">
      <body className="flex h-full w-full items-center justify-center gap-[3.2rem] bg-background-100">
        <div className="flex flex-col items-center gap-[1.6rem] rounded-[3.2rem] bg-white px-[8.2rem] py-[8.3rem]">
          <Image src="/icons/warning_icon.svg" alt="waring icon" width={50} height={50} />
          <h4 className="heading_4 font-bold">에러가 발생했습니다.</h4>
          <span className="body_3">에러 코드: {error.digest}</span>
          <Button className="px-[16.5rem] py-[1.8rem]" bgColor="bg-navy-900 body_3" onClick={() => reset()}>
            <RefreshIcon width={20} height={20} />
            다시 시도
          </Button>
        </div>
      </body>
    </html>
  );
}
