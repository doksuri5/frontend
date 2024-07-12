import { create } from "zustand";

export interface IUserProfile {
  interest_stocks: string[];
  gender: "M" | "F";
  profile: string;
  nickname: string;
}
export interface IUserPrivacy {
  _id: string;
  name: string;
  email: string;
  birth: string;
  phone: string;
  login_type: string;
}

export interface IUserData extends IUserProfile, IUserPrivacy {}

type UserStoreState = {
  userStoreData: IUserData | null;
  setUserStoreData: (data: IUserData) => void;
};

const useUserStore = create<UserStoreState>((set) => ({
  userStoreData: null,
  setUserStoreData: (data) => set({ userStoreData: data }),
}));

export default useUserStore;
