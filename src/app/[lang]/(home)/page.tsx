import Image from "next/image";
import CommonLoginBtn from "../(auth)/_components/CommonLoginBtn";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { Locale } from "@/i18n";

export default async function HomeRootPage({ params }: { params: { lang: Locale } }) {
  unstable_setRequestLocale(params.lang);
  const t = await getTranslations("main");

  return (
    <div className="flex flex-col items-center justify-between">
      <dl className="flex_col_center fadeInUp-animation mb-[5.8rem] mt-[7rem] text-white">
        <dt className="heading_1 font-medium">
          {t("part1")} <em className="font-extrabold not-italic">{t("part2")}</em>{t("part3")}
        </dt>
        <dd className="heading_4 mb-[5.6rem] mt-[2.4rem] text-center font-medium whitespace-pre-wrap">
          {t("message")}
        </dd>
        <dd>
          <CommonLoginBtn className="w-[38.6rem]" />
        </dd>
      </dl>
      <Image src={"/images/intro_content.png"} alt="아잇나우" width={1038} height={526} />
    </div>
  );
}
