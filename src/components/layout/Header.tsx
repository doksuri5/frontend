"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "../common";

import { filterMainPath } from "@/utils/filter-mainpath";

import LightLogo from "@/public/icons/light_logo.svg?component";
import DarkLogo from "@/public/icons/dark_logo.svg?component";

import { DISCOVERY_PATH, MAIN_PATH, HOME_PATH, MY_PAGE_PATH, MY_STOCK_PATH, NEWS_PATH } from "@/routes/path";
import { logoutAction } from "@/actions/auth-action";
import { useTranslations } from "next-intl";

type THeaderProps = {
  isLoggedIn: boolean;
};

const Header = ({ isLoggedIn }: THeaderProps) => {
  const pathname = usePathname();
  const t = useTranslations("header");

  const buttonList = [
    { text: t("discovery", { defaultMessage: "발견" }), url: DISCOVERY_PATH },
    { text: t("news", { defaultMessage: "뉴스" }), url: NEWS_PATH },
    { text: t("interestStocks", { defaultMessage: "관심종목" }), url: MY_STOCK_PATH },
    { text: t("myPage", { defaultMessage: "마이페이지" }), url: MY_PAGE_PATH },
  ];

  const handleLogOut = async () => {
    logoutAction();
  };

  return (
    <header
      className={`flex_row_center fixed left-0 top-0 z-50 h-[8rem] w-full py-[1rem] ${filterMainPath(pathname) && !isLoggedIn ? "bg-transparent" : "bg-white"}`}
    >
      <div className="flex_row h-full w-[120rem] justify-between">
        <div className="flex_row h-full">
          <Link href={isLoggedIn ? HOME_PATH : MAIN_PATH} aria-label="Move to Main Page">
            {filterMainPath(pathname) && !isLoggedIn ? <LightLogo /> : <DarkLogo />}
          </Link>
          {isLoggedIn && (
            <nav className="flex_row_center ml-[2rem] h-full">
              {buttonList.map((item) => (
                <Link
                  key={item.text}
                  href={item.url}
                  className={`body_3 flex_row_center h-full w-[16rem] ${item.url === pathname && "font-bold"} text-navy-900`}
                >
                  {item.text}
                </Link>
              ))}
            </nav>
          )}
        </div>
        {isLoggedIn && (
          <Button
            variant="textButton"
            size="sm"
            bgColor="bg-white"
            className="body_5 w-[10.2rem] font-medium"
            onClick={handleLogOut}
          >
            {t("logout", { defaultMessage: "로그아웃" })}
          </Button>
        )}
      </div>
    </header>
  );
};

export default Header;
