import { Locale } from "@/i18n";
import { unstable_setRequestLocale } from "next-intl/server";

export default function layout({ children, params }: { children: React.ReactNode; params: { lang: Locale } }) {
  unstable_setRequestLocale(params.lang);
  return <>{children}</>;
}
