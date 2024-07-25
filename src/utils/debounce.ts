const debounce = (func: any, wait: number) => {
  let timeout: NodeJS.Timeout | null;
  // 클로저를 이용하여 timeout 을 유지한다. 함수 렉시컬 스코프를 이용한 클로저
  return (...args: any) => {
    if (timeout) clearTimeout(timeout);

    timeout = setTimeout(() => {
      timeout = null;
      // 여기서 this 는 useDebounce 의 this 즉, 상위 스코프의 this 를 가리킨다.
      func.apply(this, args);
    }, wait);
  };
};

export default debounce;
