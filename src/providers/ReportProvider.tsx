"use client";

import { type ReactNode, createContext, useRef, useContext } from "react";
import { type StoreApi, useStore } from "zustand";

import { type ReportStore, createReportStore, initReportStore } from "../stores/useReportStore";

export const ReportStoreContext = createContext<StoreApi<ReportStore> | null>(null);

export interface ReportStoreProviderProps {
  children: ReactNode;
}

export const ReportStoreProvider = ({ children }: ReportStoreProviderProps) => {
  const storeRef = useRef<StoreApi<ReportStore>>();
  if (!storeRef.current) {
    storeRef.current = createReportStore(initReportStore());
  }

  return <ReportStoreContext.Provider value={storeRef.current}>{children}</ReportStoreContext.Provider>;
};

export const useReportStore = <T,>(selector: (store: ReportStore) => T): T => {
  const reportStoreContext = useContext(ReportStoreContext);

  if (!reportStoreContext) {
    throw new Error(`useReportStore must be use within ReportStoreProvider`);
  }

  return useStore(reportStoreContext, selector);
};
