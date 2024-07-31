import { commonAuthMetadata } from "@/utils/metadata";
import { unstable_setRequestLocale } from "next-intl/server";

export async function generateMetadata() {
  return commonAuthMetadata("registerComplete");
}
export default function RegisterCompleteLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  unstable_setRequestLocale(params.lang);

  return <>{children}</>;
}
