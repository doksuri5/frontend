"use client";

import { Button } from "@/components/common";
import { useMyStockStore } from "@/providers/MyStockProvider";

const MyStockHeader = ({ userName }: { userName: string }) => {
  const setOpenModal = useMyStockStore((state) => state.setOpenModal);

  const handleAddStock = () => {
    setOpenModal(true);
  };

  return (
    <section className="flex_row justify-between pt-[5.6rem]">
      <h1 className="heading_4 font-bold text-navy-900">{userName}님의 관심종목</h1>
      <Button variant="textButton" size="sm" bgColor="bg-navy-900" className="w-[19rem]" onClick={handleAddStock}>
        관심종목 추가
      </Button>
    </section>
  );
};

export default MyStockHeader;
