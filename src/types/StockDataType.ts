export interface StockDataType {
  _id: string;
  icon: string;
  stockName: string;
  reutersCode?: string;
  symbolCode: string;
  price: number;
  nationType?: string;
  compareToPreviousClosePrice: number;
  fluctuationsRatio: number;
}

export interface StockDetailDataType extends StockDataType {
  stockCode: string;
  priceUSD: number;
  description: string;
  score: number;
  isMyStock: boolean;
  aiReport: string;
}
