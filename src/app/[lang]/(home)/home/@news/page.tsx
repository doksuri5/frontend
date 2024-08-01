import { unstable_setRequestLocale } from "next-intl/server";
import NewsBox from "../_components/news-box";
import { Locale } from "@/i18n";

export default async function NewsParallelPage({ params }: { params: { lang: Locale } }) {
  unstable_setRequestLocale(params.lang);

  return (
    <section>
      <NewsBox />
    </section>
  );
}
