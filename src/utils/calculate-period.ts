import { TMappedPeriod } from "@/types/StockDataType";

// create startDateTime and endDateTime period calculation ex) 202308010000, 202407181725
const calculatePeriod = (period: keyof TMappedPeriod) => {
  const formatDateTime = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${year}${month}${day}${hours}${minutes}`;
  };

  const currentDate = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Seoul" }));
  let startDateTime = "";
  let endDateTime = formatDateTime(currentDate);

  switch (period) {
    case "일":
      startDateTime = formatDateTime(new Date(new Date().setMonth(currentDate.getMonth() - 3)));
      break;
    case "주":
      startDateTime = formatDateTime(new Date(new Date().setFullYear(currentDate.getFullYear() - 1)));
      break;
    case "월":
      startDateTime = formatDateTime(new Date(new Date().setFullYear(currentDate.getFullYear() - 3)));
      break;
    case "분기":
      startDateTime = formatDateTime(new Date(new Date().setFullYear(currentDate.getFullYear() - 5)));
      break;
    case "년":
      startDateTime = formatDateTime(new Date(new Date().setFullYear(currentDate.getFullYear() - 7)));
      break;
    default:
      break;
  }

  return [startDateTime, endDateTime];
};

export default calculatePeriod;
