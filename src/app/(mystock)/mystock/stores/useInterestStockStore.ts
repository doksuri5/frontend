import { create } from "zustand";
import { StockDataType } from "@/types";

interface InterestStockType {
  stockItemList: StockDataType[];
  setStockItemList: (fetchData: StockDataType[]) => void;
  addStockItemList: (newStockItem: StockDataType) => void;
  deleteStockItem: (stockItem: StockDataType) => void;
}
const useInterestStockStore = create<InterestStockType>()((set) => ({
  stockItemList: [],
  setStockItemList: (fetchData) => set({ stockItemList: fetchData }),
  addStockItemList: (newStockItem) => set((state) => ({ stockItemList: [...state.stockItemList, newStockItem] })),
  deleteStockItem: (stockItem) =>
    set((state) => ({
      stockItemList: state.stockItemList.filter((stock) => stock._id !== stockItem._id),
    })),
}));

export default useInterestStockStore;
