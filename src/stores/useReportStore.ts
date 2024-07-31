import { createStore } from "zustand/vanilla";

export type TPeriod = "day" | "week" | "month" | "quarter" | "year";

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
  period: "day",
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
