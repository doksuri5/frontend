import { useState } from "react";

export default function useAlert() {
  interface ICustomAlert {
    title: string;
    subText: string;
    onClose: () => void;
  }

  const [alertInfo, setAlertInfo] = useState({
    open: false,
    title: "",
    subText: "",
    buttonText: "확인",
    onClose: () => {},
  });

  const customAlert = ({ title, subText, onClose }: ICustomAlert) => {
    setAlertInfo({
      open: true,
      title,
      subText,
      buttonText: "확인",
      onClose: () => {
        setAlertInfo((prevState) => ({ ...prevState, open: false }));
        onClose();
      },
    });
  };

  return { alertInfo, customAlert };
}
