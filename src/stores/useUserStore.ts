import { create } from "zustand";

export interface IUserData {
  _id?: string;
  name?: string;
  email?: string;
  interest_stocks?: string[];
  birth?: string;
  phone?: string;
  gender?: "M" | "F";
  profile?: string;
  nickname?: string;
  login_type?: string;
}

type UserStoreState = {
  userStoreData: IUserData | null;
  setUserStoreData: (data: IUserData) => void;
};

const useUserStore = create<UserStoreState>((set) => ({
  userStoreData: null,
  setUserStoreData: (data) => set({ userStoreData: data }),
}));

export default useUserStore;
