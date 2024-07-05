"use client";

import { Button } from "@/components/common";
import Image from "next/image";
import RefreshIcon from "@/public/icons/refresh_icon.svg?component";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <section className="flex h-screen w-full items-center justify-center">
      <div className="flex max-w-[69rem] flex-col items-center gap-[1.6rem] rounded-[3.2rem] bg-white px-[8.2rem] py-[8.3rem]">
        <Image src="/icons/warning_icon.svg" alt="waring icon" width={50} height={50} />
        <h4 className="heading_4 font-bold">요청하신 페이지를 찾을 수 없습니다.</h4>
        <span className="body_3 text-center">
          페이지의 주소가 잘못 입력되었거나
          <br />
          주소가 변경 혹은 삭제되어 요청하신 페이지를 찾을 수 없습니다.
        </span>
        <Button
          className="px-[16.5rem] py-[1.8rem]"
          bgColor="bg-navy-900 body_3 mt-[1.6rem]"
          onClick={() => router.replace("/")}
        >
          <RefreshIcon width={20} height={20} />
          메인으로
        </Button>
      </div>
    </section>
  );
}