"use client";

import { type ReactNode, createContext, useRef, useContext } from "react";
import { type StoreApi, useStore } from "zustand";

import { type MyStockStore, createMyStockStore, initMyStockStore } from "../stores/useMyStockStore";

export const MyStockStoreContext = createContext<StoreApi<MyStockStore> | null>(null);

export interface MyStockStoreProviderProps {
  children: ReactNode;
}

export const MyStockStoreProvider = ({ children }: MyStockStoreProviderProps) => {
  const storeRef = useRef<StoreApi<MyStockStore>>();
  if (!storeRef.current) {
    storeRef.current = createMyStockStore(initMyStockStore());
  }

  return <MyStockStoreContext.Provider value={storeRef.current}>{children}</MyStockStoreContext.Provider>;
};

export const useMyStockStore = <T,>(selector: (store: MyStockStore) => T): T => {
  const myStockStoreContext = useContext(MyStockStoreContext);

  if (!myStockStoreContext) {
    throw new Error(`useMyStockStore must be use within MyStockStoreProvider`);
  }

  return useStore(myStockStoreContext, selector);
};
