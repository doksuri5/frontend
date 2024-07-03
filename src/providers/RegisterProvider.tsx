"use client";

import { type ReactNode, createContext, useRef, useContext } from "react";
import { type StoreApi, useStore } from "zustand";

import { type RegisterStore, createFormStore, initFormStore } from "../stores/useRegisterStore";

export const RegisterStoreContext = createContext<StoreApi<RegisterStore> | null>(null);

export interface RegisterStoreProviderProps {
  children: ReactNode;
}

export const RegisterStoreProvider = ({ children }: RegisterStoreProviderProps) => {
  const storeRef = useRef<StoreApi<RegisterStore>>();
  if (!storeRef.current) {
    storeRef.current = createFormStore(initFormStore());
  }

  return <RegisterStoreContext.Provider value={storeRef.current}>{children}</RegisterStoreContext.Provider>;
};

export const useRegisterStore = <T,>(selector: (store: RegisterStore) => T): T => {
  const registerStoreContext = useContext(RegisterStoreContext);

  if (!registerStoreContext) {
    throw new Error(`useRegisterStore must be use within RegisterStoreProvider`);
  }

  return useStore(registerStoreContext, selector);
};
