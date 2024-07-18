// 이전 종가 대비 가격 변화 색상을 반환 (+ : 빨간색, - : 파란색)
export const getTextColor = (data: number) => {
  if (data === 0) return "text-grayscale-500";
  else if (data < 0) return "text-blue-600";
  else return "text-warning-100";
};

// 숫자 값에 따라 상승 또는 하락 화살표 표시를 포함하여 문자열을 반환
export const formatValueWithIndicator = (data: number) => {
  if (data === 0) return 0;
  else if (data < 0) return `▼${Math.abs(data)}`;
  else return `▲${data}`;
};

export const formatOnlyIndicator = (data: number) => {
  if (data === 0) return 0;
  else if (data < 0) return `▼`;
  else return `▲`;
};

// 숫자 값이 양수일 경우 + 부호를 포함하여 문자열을 반환
export const formatValueWithSign = (data: number) => {
  if (data > 0) return `+${data}`;
  return data;
};
