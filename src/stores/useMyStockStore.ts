import { createStore } from "zustand/vanilla";

type TMyStockState = {
  openModal: boolean;
};

export type TMyStockAction = {
  setOpenModal: (state: boolean) => void;
};

export type MyStockStore = TMyStockState & TMyStockAction;

export const defaultInitState = {
  openModal: false,
};

export const initMyStockStore = () => {
  return { ...defaultInitState };
};

export const createMyStockStore = (initState: TMyStockState = defaultInitState) => {
  return createStore<MyStockStore>((set) => ({
    ...initState,
    setOpenModal: (isOpen: boolean) => set({ openModal: isOpen }),
  }));
};
