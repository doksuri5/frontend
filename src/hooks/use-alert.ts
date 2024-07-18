import { useState } from "react";

export default function useAlert() {
  interface ICustomAlert {
    title: string;
    subText: string;
    buttonText: string;
    onClose: () => void;
  }

  const [alertInfo, setAlertInfo] = useState({
    open: false,
    title: "",
    subText: "",
    buttonText: "",
    onClose: () => {},
  });

  const customAlert = ({ title, subText, buttonText, onClose }: ICustomAlert) => {
    setAlertInfo({
      open: true,
      title,
      subText,
      buttonText,
      onClose: () => {
        setAlertInfo((prevState) => ({ ...prevState, open: false }));
        onClose();
      },
    });
  };

  return { alertInfo, customAlert };
}
