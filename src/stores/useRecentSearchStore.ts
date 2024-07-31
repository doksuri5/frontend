import { StockDataType } from "@/types";
import { create } from "zustand";
interface RecentSearchType {
  searchItemList: StockDataType[];
  setSearchItemList: (fetchData: StockDataType[]) => void;
  addSearchItemList: (newStockItem: StockDataType) => void;
  allDeleteSearchItem: () => void;
}

const useRecentSearchStore = create<RecentSearchType>()((set) => ({
  searchItemList: [],
  setSearchItemList: (fetchData) => set({ searchItemList: fetchData }),
  addSearchItemList: (newStockItem) =>
    set((state) => {
      const existingIndex = state.searchItemList.findIndex((item) => item.stockName === newStockItem.stockName);

      if (existingIndex !== -1) {
        // 이미 존재하는 항목을 배열에서 제거
        const updatedList = [...state.searchItemList];
        updatedList.splice(existingIndex, 1);
        // 새로운 항목을 배열의 처음에 추가
        return { searchItemList: [newStockItem, ...updatedList] };
      }

      // 새로운 항목을 배열의 처음에 추가
      return { searchItemList: [newStockItem, ...state.searchItemList] };
    }),
  allDeleteSearchItem: () => set({ searchItemList: [] }),
}));

export default useRecentSearchStore;
