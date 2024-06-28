import { MyStockArea } from "./_components";
import { StockDataType } from "@/types";
import Apple_icon from "@/public/icons/Apple_icon.svg";

const stockList: StockDataType[] = [
  {
    _id: "1",
    icon: Apple_icon,
    stockName: "애플",
    symbolCode: "AAPL",
    price: 0.0,
    nationType: "USA",
    compareToPreviousClosePrice: 1.75,
    fluctuationsRatio: 0.82,
  },
  {
    _id: "2",
    icon: Apple_icon,
    stockName: "애플",
    symbolCode: "AAPL",
    price: 0.0,
    nationType: "USA",
    compareToPreviousClosePrice: -1.75,
    fluctuationsRatio: -0.82,
  },
  {
    _id: "3",
    icon: Apple_icon,
    stockName: "애플",
    symbolCode: "AAPL",
    price: 0.0,
    nationType: "USA",
    compareToPreviousClosePrice: -1.75,
    fluctuationsRatio: -0.82,
  },
  {
    _id: "4",
    icon: Apple_icon,
    stockName: "애플",
    symbolCode: "AAPL",
    price: 0.0,
    nationType: "USA",
    compareToPreviousClosePrice: -1.75,
    fluctuationsRatio: -0.82,
  },
  {
    _id: "5",
    icon: Apple_icon,
    stockName: "애플",
    symbolCode: "AAPL",
    price: 0.0,
    nationType: "USA",
    compareToPreviousClosePrice: -1.75,
    fluctuationsRatio: -0.82,
  },
  {
    _id: "6",
    icon: Apple_icon,
    stockName: "애플",
    symbolCode: "AAPL",
    price: 0.0,
    nationType: "USA",
    compareToPreviousClosePrice: -1.75,
    fluctuationsRatio: -0.82,
  },
];

const userName = "김스팩";

export default function MyStockPage() {
  const data = stockList;

  return (
    <>
      <MyStockArea dataList={data} userName={userName} />
    </>
  );
}
