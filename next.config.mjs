/** @type {import('next').NextConfig} */
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig = {
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  experimental: {
    instrumentationHook: true,
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "imgnews.pstatic.net" },
      { protocol: "https", hostname: "doksuri5-s3.s3.ap-northeast-2.amazonaws.com" },
    ],
  },
  webpack(config) {
    // 기존 svg 파일 불러올 때의 조건
    const fileLoaderRule = config.module.rules.find((rule) => rule.test?.test?.(".svg"));

    config.module.rules.push(
      // svg 파일일 경우 아래를 실행
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: { not: /component/ }, // *.svg
      },
      // svg 컴포넌트를 사용할 경우 아래를 실행
      {
        test: /\.svg$/i,
        resourceQuery: /component/, // *.svg?component
        use: ["@svgr/webpack"],
      },
    );
    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
};

export default withNextIntl(nextConfig);
