import Head from 'next/head';
import { Suspense, lazy } from "react";
import { useTranslations } from "next-intl";

interface IMetadata {
  title: string;
  description: string;
  keywords: string;
  openGraph: {
    title: string;
    description: string;
  };
  twitter: {
    title: string;
    description: string;
  };
}

export const metadata: IMetadata = {
  title: "마이페이지",
  description: "사용자의 개인 설정과 정보를 관리할 수 있는 마이 페이지입니다. 개인 설정과 정보를 쉽게 관리하세요.",
  keywords: "마이페이지, 언어 설정, 개인정보 수정, 개인정보, 프로필, 회원탈퇴, 탈퇴, 이용약관, 약관",
  openGraph: {
    title: '마이페이지',
    description: "사용자의 개인 설정과 정보를 관리할 수 있는 마이 페이지입니다. 개인 설정과 정보를 쉽게 관리하세요."
  },
  twitter: {
    title: "마이페이지",
    description: "사용자의 개인 설정과 정보를 관리할 수 있는 마이 페이지입니다. 개인 설정과 정보를 쉽게 관리하세요."
  }
}

const Navigation = lazy(() => import("./_components/Navigation"));

export default function Layout({ children }: { children: React.ReactNode }) {
  const t = useTranslations("header");

  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
        <meta property="og:title" content={metadata.openGraph.title} />
        <meta property="og:description" content={metadata.openGraph.description} />
        <meta property="twitter:title" content={metadata.twitter.title} />
        <meta property="twitter:description" content={metadata.twitter.description} />
      </Head>

      <header className="heading_4 pb-[2rem] pt-[5.6rem] font-bold text-gray-900">{t("myPage")}</header>
      <div className="flex flex-row gap-[2.7rem] pb-[11.2rem]">
        <aside className="min-h-[72rem] min-w-[28.5rem] rounded-[1.6rem] bg-grayscale-0">
          <Suspense fallback={<div>Loading...</div>}>
            <Navigation />
          </Suspense>
        </aside>
        <main className="min-h-[72rem] flex-grow rounded-[1.6rem] bg-grayscale-0 p-[3.2rem]">{children}</main>
      </div>
    </>
  );
}
