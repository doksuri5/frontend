import { Suspense } from "react";
import DiscoverySearchLoading from "./loading";

interface generateMetadataPropsType {
  params: {
    search: string;
  };
}
export const generateMetadata = ({ params }: generateMetadataPropsType) => {
  const search = decodeURIComponent(params.search);
  return {
    title: `${search} : 검색 결과`,
    description: `${search}에 대한 검색 결과를 확인하세요.`,
    keywords: `${search}, 주식 검색, 실시간 주식 뉴스, AI 주식 분석, 아잇나우, AIGHTNOW, aightnow`,
    openGraph: {
      title: `${search} : 검색 결과`,
      description: `${search}에 대한 검색 결과를 확인하세요.`,
    },
    twitter: {
      title: `${search} : 검색 결과`,
      description: `${search}에 대한 검색 결과를 확인하세요.`,
    },
  };
};

export default function DiscoverySearchLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { search: string };
}) {
  return <Suspense fallback={<DiscoverySearchLoading />}>{children}</Suspense>;
}
