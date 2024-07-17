import { toast, ToastOptions } from "react-toastify";

export default function useToast() {
  const showLoadingToast = (loadingMessage: string) => {
    const id = toast.loading(loadingMessage);
    return id;
  };

  const updateToast = (id: string | number, render: string, type: ToastOptions["type"], autoClose: number = 2000) => {
    toast.update(id, {
      render,
      isLoading: false,
      type,
      autoClose,
    });
  };

  return { showLoadingToast, updateToast };
}
