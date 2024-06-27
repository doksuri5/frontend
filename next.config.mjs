/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "imgnews.pstatic.net" }],
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

export default nextConfig;
