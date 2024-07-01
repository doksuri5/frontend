import { create } from "zustand";
import { SearchDetailDataType } from "@/types";

interface RecentSearchType {
  stockItemList: SearchDetailDataType[];
  setStockItemList: (fetchData: SearchDetailDataType[]) => void;
  addStockItemList: (newStockItem: SearchDetailDataType) => void;
  allDeleteStockItem: () => void;
}
const useRecentSearchStore = create<RecentSearchType>()((set) => ({
  stockItemList: [],
  setStockItemList: (fetchData) => set({ stockItemList: fetchData }),
  addStockItemList: (newStockItem) =>
    set((state) => {
      const existingIndex = state.stockItemList.findIndex((item) => item.stockName === newStockItem.stockName);

      if (existingIndex !== -1) {
        // 이미 존재하는 항목을 배열에서 제거
        const updatedList = [...state.stockItemList];
        updatedList.splice(existingIndex, 1);
        // 새로운 항목을 배열의 처음에 추가
        return { stockItemList: [newStockItem, ...updatedList] };
      }

      // 새로운 항목을 배열의 처음에 추가
      return { stockItemList: [newStockItem, ...state.stockItemList] };
    }),
  allDeleteStockItem: () => set({ stockItemList: [] }),
}));

export default useRecentSearchStore;
