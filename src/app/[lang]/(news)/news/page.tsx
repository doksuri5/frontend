import News from "@/app/[lang]/(news)/news/_components";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n";

export default async function NewsPage({ params: { lang } }: { params: { lang: Locale } }) {
  const dictionary = await getDictionary(lang);
  return <News />;
}
