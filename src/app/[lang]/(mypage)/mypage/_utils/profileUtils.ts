import { IOption } from "../_components/EditProfileForm";

// 서버에서 받은 관심 종목 데이터를 react select에서 사용할 수 있는 형식으로 변경하는 함수
export const mapInterestStocksToInitialValue = (interestStocks: string[], stockList: IOption[]): IOption[] => {
  if (!interestStocks) {
    return [];
  }
  return interestStocks.map((stockCode) => {
    const stock = stockList.find((s) => s.value === stockCode);
    return stock || { value: stockCode, label: `#${stockCode}` };
  });
};

// react select에서 유저가 선택한 데이터의 value값만 뽑아내는 함수
export const getStockCodesFromOptions = (stockList: IOption[]): string[] => {
  return stockList.map((stock) => stock.value);
};

// 프로필 URL에 랜덤한 숫자를 추가하여 캐시를 우회하도록 하는 함수
export const createProfileImgURL = (url: string, random = true): string => {
  if (!url) return "";
  
  const randomValue = Math.floor(Math.random() * 1e8).toString();
  const imageUrl = `https://doksuri5-s3.s3.ap-northeast-2.amazonaws.com/${url}`;
  return random ? imageUrl + "?" + randomValue : imageUrl;
};
