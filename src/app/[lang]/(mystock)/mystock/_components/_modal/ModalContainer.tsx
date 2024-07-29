"use client";

import { Suspense, useEffect, useState, lazy } from "react";
import { useTranslations } from "next-intl";
import { Modal } from "@/components/common";
import {
  ModalInput,
  ModalSearchResult,
  MyStockPopularStockSkeleton,
  MyStockRecentSearchSkeleton,
} from "@/app/[lang]/(mystock)/mystock/_components";
import { useMyStockStore } from "@/providers/MyStockProvider";
import { getPopularSearches, getRecentSearchDetails } from "@/actions/stock";
import { StockDataType, StockPopularSearchDataType } from "@/types/StockDataType";

const ModalPopularSearches = lazy(
  () => import("@/app/[lang]/(mystock)/mystock/_components/_modal/ModalPopularSearches"),
);
const ModalRecentSearches = lazy(() => import("@/app/[lang]/(mystock)/mystock/_components/_modal/ModalRecentSearches"));

const ModalContainer = ({ isData }: { isData: boolean }) => {
  const t = useTranslations("myStock");

  const [popularData, setPopularData] = useState<StockPopularSearchDataType[]>([]);
  const [recentSearchedData, setRecentSearchedData] = useState<StockDataType[]>([]);
  const [searchText, setSearchText] = useState("");

  const { openModal, setOpenModal } = useMyStockStore((state) => ({
    openModal: state.openModal,
    setOpenModal: state.setOpenModal,
  }));

  const closeModal = () => {
    setOpenModal(false);
    setSearchText("");
  };

  useEffect(() => {
    isData && setOpenModal(true);
  }, [isData, setOpenModal]);

  useEffect(() => {
    if (openModal) {
      const fetchData = async () => {
        const [popularDataResult, recentSearchedDataResult] = await Promise.allSettled([
          getPopularSearches(),
          getRecentSearchDetails(),
        ]);

        if (popularDataResult.status === "fulfilled" && popularDataResult.value.ok) {
          setPopularData(popularDataResult.value.data);
        }

        if (recentSearchedDataResult.status === "fulfilled" && recentSearchedDataResult.value.ok) {
          setRecentSearchedData(recentSearchedDataResult.value.data);
        }
      };

      fetchData();
    }
  }, [openModal]);

  return (
    <Modal
      panelStyle="p-[4rem] rounded-[3.2rem] w-[80rem] min-h-[57rem]"
      isOpen={openModal}
      onClose={closeModal}
      title={t("modal.modalTitle")}
      titleStyle="body_1 text-navy-900"
      closeIcon={true}
    >
      <div className="mt-[3rem] flex w-full flex-col gap-[2.4rem]">
        <ModalInput setRecentSearchedData={setRecentSearchedData} setSearchText={setSearchText} />
        {searchText !== "" ? (
          <>
            <ModalSearchResult searchText={searchText} />
          </>
        ) : (
          <>
            <Suspense fallback={<MyStockRecentSearchSkeleton />}>
              <ModalRecentSearches
                recentSearchedData={recentSearchedData}
                setRecentSearchedData={setRecentSearchedData}
                setSearchText={setSearchText}
              />
            </Suspense>
            <Suspense fallback={<MyStockPopularStockSkeleton />}>
              <ModalPopularSearches popularData={popularData} />
            </Suspense>
          </>
        )}
      </div>
    </Modal>
  );
};

export default ModalContainer;
