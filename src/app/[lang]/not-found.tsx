"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/common";

import Image from "next/image";
import { useTranslations } from "next-intl";

export default function NotFound() {
  const t = useTranslations("notFound");
  const router = useRouter();

  return (
    <section className="flex h-screen w-full items-center justify-center">
      <div className="flex max-w-[69rem] flex-col items-center gap-[1.6rem] rounded-[3.2rem] bg-white px-[8.2rem] py-[8.3rem]">
        <Image src="/icons/warning_icon.svg" alt="waring icon" width={64} height={64} />
        <h4 className="heading_4 font-bold text-navy-900">{t("notFoundTitle")}</h4>
        <span className="body_3 text-center font-medium text-navy-900 whitespace-pre-wrap">
          {t("notFoundDescription")}
        </span>
        <Button
          className="px-[16.5rem] py-[1.8rem]"
          bgColor="bg-navy-900 body_3 mt-[1.6rem]"
          onClick={() => router.replace("/")}
        >
          {t("backToHome")}
        </Button>
      </div>
    </section>
  );
}
