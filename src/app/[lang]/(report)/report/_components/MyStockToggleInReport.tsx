"use client";

import { deleteInterestStock, getDetailInterestStocks, insertInterestStock } from "@/actions/stock";
import { Button, Skeleton } from "@/components/common";
import { TReutersCodes } from "@/constants/stockCodes";
import { useTranslations } from "next-intl";
import { useLayoutEffect, useState, useTransition } from "react";

const MyStockToggleInReport = ({ reutersCode }: { reutersCode: TReutersCodes }) => {
  const t = useTranslations("report");
  const [isMyStockState, setIsMyStockState] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleOnClick = async () => {
    if (isMyStockState) {
      const res = await deleteInterestStock(undefined, { params: reutersCode });
      if (!res.ok) {
        return;
      }
      setIsMyStockState(false);
    }
    if (!isMyStockState) {
      const res = await insertInterestStock({ reutersCode });
      if (!res.ok) {
        return;
      }
      setIsMyStockState(true);
    }
  };

  useLayoutEffect(() => {
    const fetchData = async () => {
      const myStocks = await getDetailInterestStocks();

      if (!myStocks.ok) {
        return;
      }

      const item = myStocks.data.find((item) => reutersCode === item.reutersCode);

      if (item) {
        setIsMyStockState(true);
      }
    };
    startTransition(async () => {
      await fetchData();
    });
  }, [reutersCode]);

  if (isPending) return <Skeleton className="h-[5.6rem] w-[18rem] bg-white" />;
  return (
    <>
      {isMyStockState ? (
        <Button
          variant="textButton"
          size="md"
          className="w-[18rem] bg-transparent"
          bgColor="bg-white"
          onClick={handleOnClick}
        >
          {t("removeInterestStock")}
        </Button>
      ) : (
        <Button variant="textButton" size="md" className="w-[18rem] text-white" onClick={handleOnClick}>
          {t("addInterestStock")}
        </Button>
      )}
    </>
  );
};

export default MyStockToggleInReport;
