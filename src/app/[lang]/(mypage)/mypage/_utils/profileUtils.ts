import { IOption } from "../_components/EditProfileForm";

// 관심 주식 코드 배열을 받아서, stockList에서 해당하는 IOption 객체를 찾아 배열로 반환합니다.
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
