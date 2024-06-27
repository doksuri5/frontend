"use client";

import { cn } from "@/utils/cn";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menuList = [
  { key: "개인정보 수정", url: "/mypage" },
  { key: "언어 설정", url: "/mypage/language-setting" },
  { key: "서비스 이용약관", url: "/mypage/terms" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div>
      <div className="heading_4 pb-[2rem] pt-[5.6rem] font-bold text-gray-900">마이페이지</div>
      <div className="flex flex-row gap-[2.7rem]">
        <div className="h-[72rem] w-[28.5rem] rounded-[1.6rem] bg-grayscale-0">
          <div className="mt-[2.4rem] flex flex-col gap-[.8rem]">
            <ul>
              {menuList.map((item) => (
                <li
                  key={item.key}
                  className={cn(
                    `items-center" flex h-[6rem] w-[100%] border-l-[.8rem] px-[2.4rem] py-[1.6rem] ${pathname === item.url ? "border-grayscale-900 font-bold" : "border-grayscale-0"}`,
                  )}
                >
                  <Link href={item.url}>{item.key}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="h-[72rem] w-[88.8rem] rounded-[1.6rem] bg-grayscale-0 p-[3.2rem]">{children}</div>
      </div>
    </div>
  );
}
