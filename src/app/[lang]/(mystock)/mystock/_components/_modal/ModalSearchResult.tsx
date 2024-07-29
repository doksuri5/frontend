"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import SearchItem from "./SearchItem";
import SearchItemSkeleton from "../_skeleton/SearchItemSkeleton";
import { getSearchStocks } from "@/actions/search";
import { StockDataType } from "@/types";
import WarningIcon from "@/public/icons/warning_icon.svg?component";

const ModalSearchResult = ({ searchText }: { searchText: string }) => {
  const t = useTranslations("myStock");
  const s_t = useTranslations("searchBox");

  const [lists, setLists] = useState<StockDataType[]>([]);
  const [isRender, setIsRender] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getSearchStocks(undefined, { params: searchText });
        if (res.ok) {
          setLists(res.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsRender(false);
      }
    };

    fetchData();
  }, [searchText]);

  return (
    <div className="flex flex-col gap-[1.6rem]">
      <h3 className="body_3 font-medium text-navy-900">{t("modal.modalSearchTitle")}</h3>
      <div
        className={`flex_col h-[34rem] gap-[1.6rem] overflow-auto scrollbar-hide ${lists.length === 0 && "justify-center"}`}
      >
        {isRender ? (
          Array.from({ length: 3 }).map((_, idx) => <SearchItemSkeleton key={idx} />)
        ) : lists.length !== 0 ? (
          lists.map((data) => <SearchItem key={data.id} data={data} />)
        ) : (
          <>
            <div className="flex_row_col gap-2">
              <WarningIcon />
              <h3 className="body_3 flex font-bold">
                &quot;<span className="block max-w-[35rem] truncate">{searchText}</span>&quot; {s_t("noneStock")}
              </h3>
              <p className="body_5">{s_t("informText")}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ModalSearchResult;
