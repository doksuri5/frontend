export interface StockDataType {
  _id: string;
  icon: string;
  stockName: string;
  symbolCode: string;
  price: number;
  nationType: string;
  compareToPreviousClosePrice: number;
  fluctuationsRatio: number;
}
