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
  addStockItemList: (newStockItem) => set((state) => ({ stockItemList: [...state.stockItemList, newStockItem] })),
  allDeleteStockItem: () => set({ stockItemList: [] }),
}));

export default useRecentSearchStore;
