import Image from "next/image";
import CommonLoginBtn from "../(auth)/_components/CommonLoginBtn";
import { unstable_setRequestLocale } from "next-intl/server";
import { Locale } from "@/i18n";

export default function HomeRootPage({ params }: { params: { lang: Locale } }) {
  unstable_setRequestLocale(params.lang);

  return (
    <div className="flex flex-col items-center justify-between">
      <dl className="flex_col_center fadeInUp-animation mb-[5.8rem] mt-[7rem] text-white">
        <dt className="heading_1 font-medium">
          해외주식은 <em className="font-extrabold not-italic">아잇나우</em>와 함께!
        </dt>
        <dd className="heading_4 mb-[5.6rem] mt-[2.4rem] text-center font-medium">
          해외 주식 뉴스 실시간 번역과
          <br /> AI 애널리스트가 알려주는 어려운 해외주식 리포트
        </dd>
        <dd>
          <CommonLoginBtn className="w-[38.6rem]" />
        </dd>
      </dl>
      <Image src={"/images/intro_content.png"} alt="아잇나우" width={1038} height={526} />
    </div>
  );
}
