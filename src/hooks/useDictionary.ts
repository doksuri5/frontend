"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";

//딕셔너리 정리가 되면 타입 지정 예정
interface Dictionary {
  discovery: string;
}

const useDictionary = () => {
  const pathname = usePathname();
  const [dictionary, setDictionary] = useState<any>(null);

  useEffect(() => {
    const fetchDictionary = async () => {
      const langMatch = pathname.match(/^\/(en|ko|ch|jp|fr)/);
      const lang = langMatch ? (langMatch[1] as Locale) : null;

      if (lang) {
        const dict = await getDictionary(lang);
        setDictionary(dict);
      }
    };
    fetchDictionary();
  }, [pathname]);

  return { dictionary };
};

export default useDictionary;
