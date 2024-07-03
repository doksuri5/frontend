import { createStore } from "zustand/vanilla";

type TForm = {
  name: string;
  email: string;
  password: string;
  phone: string;
  birth: string;
};

export type TFormState = {
  form: TForm;
};

export type TRegisterAction = {
  setForm: (data: TFormState) => void;
};

export type RegisterStore = TFormState & TRegisterAction;

export const defaultInitState: TFormState = {
  form: {
    name: "",
    email: "",
    password: "",
    phone: "",
    birth: "",
  },
};

export const initFormStore = (): TFormState => {
  return { ...defaultInitState };
};

export const createFormStore = (initState: TFormState = defaultInitState) => {
  return createStore<RegisterStore>((set) => ({
    ...initState,
    setForm: (data: TFormState) => set({ form: { ...data.form } }),
  }));
};
