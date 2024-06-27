"use client";

import { Button } from "@/components/common";
import Korea from "@/public/icons/language_kr.svg?component";
import USA from "@/public/icons/language_en.svg?component";
import China from "@/public/icons/language_cn.svg?component";
import Japan from "@/public/icons/language_jp.svg?component";
import French from "@/public/icons/language_fr.svg?component";
import { useState } from "react";
import { cn } from "@/utils/cn";

interface ILanguageInform {
  icon: JSX.Element;
  label: string;
  active: boolean;
}

const languageList = [
  { icon: <Korea />, label: "한국어", active: true },
  { icon: <USA />, label: "영어", active: false },
  { icon: <China />, label: "중국어", active: false },
  { icon: <Japan />, label: "일본어", active: false },
  { icon: <French />, label: "프랑스어", active: false },
];

export default function LanguageSetting() {
  //추후 서버에 저장된 언어 설정으로 초기화하도록 수정
  const [selectedLang, setSelectedLang] = useState<string>(languageList[0].label);
  const [langList, setLangList] = useState<ILanguageInform[]>(languageList);

  const handleSelectLang = (label: string) => {
    setSelectedLang(label);
    //각 언어의 active 상태 업데이트
    const updatedLangList = langList.map((lang: ILanguageInform) => ({
      ...lang,
      active: lang.label === label,
    }));
    setLangList(updatedLangList);
  };

  return (
    <div className="flex flex-col gap-[2.4rem]">
      <div className="flex flex-col gap-[.8rem]">
        <div className="body_2 font-bold text-gray-900">언어 설정</div>
        <div>
          이 설정에서 번역할 언어를 선택하시면 뉴스 및 리포트에서 설정하신 언어로 번역한 정보를 확인할 수 있습니다.
        </div>
      </div>
      <div className="flex flex-row flex-wrap gap-[1rem]">
        {langList.map((it) => (
          <div key={it.label}>
            <Button
              variant="langButton"
              className="w-[19.8rem]"
              active={it.label === selectedLang}
              onClick={() => handleSelectLang(it.label)}
            >
              <div>
                {it.icon}
                <div
                  className={cn(`body_3 font-bold ${it.label === selectedLang ? "text-blue-600" : "text-gray-300"} `)}
                >
                  {it.label}
                </div>
              </div>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
