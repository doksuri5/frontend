"use client";
// 사용하지 마세요. 아직 개발 중인 기능입니다.
import { TFetchOptions } from "@/lib/api";
import { ResponseReturnType } from "@/types/ApiType";
import { useCallback, useEffect, useState } from "react";

type TGetAction<D> = {
  queryFn: (body?: undefined, options?: TFetchOptions) => Promise<ResponseReturnType<D>>;
  options: TFetchOptions;
};

const useGetAction = <D>({ queryFn, options }: TGetAction<D>) => {
  const [data, setData] = useState<D[]>();
  const [loading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>();

  const execute = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await queryFn(undefined, options);
      if (!response.ok) return;
      setData(response.data);
    } catch (error) {
      setError(error);
    }
    setIsLoading(false);
  }, [queryFn, options]);

  return { data, loading, error, execute };
};

export default useGetAction;
