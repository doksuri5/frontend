"use client";

import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";

//딕셔너리 정리가 되면 타입 지정 예정
interface Dictionary {
  discovery: string;
}

const useDictionary = () => {
  const pathname = usePathname();
  const [dictionary, setDictionary] = useState<any>(null);

  const lang = useMemo(() => {
    const langMatch = pathname.match(/^\/(en|ko|ch|jp|fr)/);
    return langMatch ? (langMatch[1] as Locale) : null;
  }, [pathname]);

  useEffect(() => {
    if (!lang) return;

    const fetchDictionary = async () => {
      const dict = await getDictionary(lang);
      setDictionary(dict);
    };

    fetchDictionary();
  }, [lang]);

  return { dictionary };
};

export default useDictionary;
