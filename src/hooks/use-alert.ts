import { useTranslations } from "next-intl";
import { useState } from "react";

export default function useAlert() {
  const t = useTranslations("auth");

  interface ICustomAlert {
    title: string;
    subText: string;
    onClose: () => void;
  }

  const [alertInfo, setAlertInfo] = useState({
    open: false,
    title: "",
    subText: "",
    buttonText: t("commonBtn.confirm"),
    onClose: () => {},
  });

  const customAlert = ({ title, subText, onClose }: ICustomAlert) => {
    setAlertInfo({
      open: true,
      title,
      subText,
      buttonText: t("commonBtn.confirm"),
      onClose: () => {
        setAlertInfo((prevState) => ({ ...prevState, open: false }));
        onClose();
      },
    });
  };

  return { alertInfo, customAlert };
}
