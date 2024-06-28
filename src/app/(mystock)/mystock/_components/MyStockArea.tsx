"use client";

import React, { useState } from "react";
import { Button, Modal } from "@/components/common";
import MyStockItem from "./MyStockItem";
import { StockDataType } from "@/types";

type TMyStockAreaProps = {
  dataList: StockDataType[];
  userName: string;
};
const MyStockArea = ({ dataList, userName }: TMyStockAreaProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleAddStock = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <section className="flex_row my-[5.6rem] mb-[2.4rem] justify-between">
        <h1 className="heading_4 font-bold text-navy-900">{userName}님의 관심종목</h1>
        <Button variant="textButton" size="sm" bgColor="bg-navy-900" className="w-[19rem]" onClick={handleAddStock}>
          관심종목 추가
        </Button>
      </section>
      <article className="">
        {dataList.length === 0 ? (
          <p>주식 데이터가 없습니다. 관심 종목을 추가해주세요.</p>
        ) : (
          <section className="grid w-full grid-cols-3 gap-x-[1.9rem] gap-y-[2.4rem]">
            {dataList.map((data) => (
              <MyStockItem key={data._id} data={data} />
            ))}
          </section>
        )}
      </article>
      <Modal isOpen={isOpen} onClose={handleCloseModal}>
        <div></div>
      </Modal>
    </>
  );
};

export default MyStockArea;
