import { IOption } from "../_components/EditProfileForm";

// 서버에서 받은 관심 종목 데이터를 react select에서 사용할 수 있는 형식으로 변경하는 함수
export const mapInterestStocksToInitialValue = (interestStocks: string[], stockList: IOption[]): IOption[] => {
  return interestStocks.map((stockCode) => {
    const stock = stockList.find((s) => s.value === stockCode);
    if (stock) {
      return stock;
    } else {
      return { value: stockCode, label: `#${stockCode.toLowerCase()}` };
    }
  });
};

// react select에서 유저가 선택한 데이터의 value값만 뽑아내는 함수
export const getStockCodesFromOptions = (stockList: IOption[]): string[] => {
  return stockList.map((stock) => stock.value);
};
