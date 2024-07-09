// 이전 종가 대비 가격 변화 색상을 반환 (+ : 빨간색, - : 파란색)
export const getCompareToPreviousClosePriceColor = (data: number) => {
  if (data === 0) return "text-grayscale-500";
  else if (data < 0) return "text-blue-600";
  else return "text-warning-100";
};

// 이전 종가 대비 가격 변화 화살표 기호를 반환 (+ : ▲, - : ▼)
export const getCompareToPreviousClosePriceArrow = (data: number) => {
  if (data === 0) return "";
  else if (data < 0) return "▼";
  else return "▲";
};

// 이전 종가 대비 가격 변화를 +, -가 아닌 화살표 기호를 사용하기 때문에 "-" 부호를 없애는 용도
export const getCompareToPreviousClosePriceSign = (data: number) => {
  return data < 0 ? data * -1 : data;
};

// 변동률 색상을 반환 (+ : 빨간색, - : 파란색)
export const getFluctuationsRatioColor = (data: number) => {
  if (data === 0) return "text-grayscale-500";
  else if (data < 0) return "text-blue-600";
  else return "text-warning-100";
};

// 변동률 부호를 반환 (+ 일 때만)
export const getFluctuationsRatioSign = (data: number) => {
  if (data === 0) return "";
  else if (data < 0) return "-";
  else return "+";
};
