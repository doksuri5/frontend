import { createStore } from "zustand/vanilla";

type TPeriod = "일" | "주" | "분기" | "월" | "년";

type TReportState = {
  period: TPeriod;
  isExtended: boolean;
};

export type TReportAction = {
  setPeriod: (state: TPeriod) => void;
  setIsExtended: (state: boolean) => void;
};

export type ReportStore = TReportState & TReportAction;

export const defaultInitState = {
  period: "일",
  isExtended: false,
} as TReportState;

export const initReportStore = () => {
  return { ...defaultInitState };
};

export const createReportStore = (initState: TReportState = defaultInitState) => {
  return createStore<ReportStore>((set) => ({
    ...initState,
    setPeriod: (period) => set({ period: period }),
    setIsExtended: (isOpen: boolean) => set({ isExtended: isOpen }),
  }));
};
