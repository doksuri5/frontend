import { create } from "zustand";

interface ModalStoreType {
  openModal: boolean;
  setOpenModal: (state: boolean) => void;
}

const useModalStore = create<ModalStoreType>((set) => ({
  openModal: false,
  setOpenModal: (state: boolean) => set({ openModal: state }),
}));

export default useModalStore;
