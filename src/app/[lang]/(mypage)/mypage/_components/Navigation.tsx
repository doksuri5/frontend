"use client"

import React from 'react';
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navigation = () => {
  const pathname = usePathname().slice(3);
  const menuList = [
    { key: "개인정보 수정", url: "/mypage" },
    { key: "언어 설정", url: "/mypage/language-setting" },
    { key: "서비스 이용약관", url: "/mypage/terms" },
  ];

  return (
    <div className="mt-[2.4rem] flex flex-col gap-[.8rem]">
      <ul>
        {menuList.map((item) => (
          <li
            key={item.key}
            className={`items-center flex h-[6rem] w-[100%] border-l-[.8rem] px-[2.4rem] py-[1.6rem] ${pathname === item.url ? "border-grayscale-900 font-bold" : "border-grayscale-0"}`}
          >
            <Link className="w-full" href={item.url}>
              {item.key}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Navigation;
