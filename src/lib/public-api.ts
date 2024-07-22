import { ApiRequestBody, ApiResponse, ResponseReturnType } from "@/types/ApiType";
import { ZodSchema } from "zod";
import { revalidateTag } from "next/cache";
import { TStockTags } from "@/actions/stock";
import { TRecentTags } from "@/actions/search";

export type TBaseOptions = RequestInit & {
  isFetchFromRouteHandler?: boolean;
  revalidateTags?: TStockTags[] | TRecentTags[];
  isLoggedIn?: boolean;
  isDataArray?: boolean;
};

export type TFetchOptions = RequestInit & {
  params?: string;
  queryString?: string[];
};
/**
 *
 * @param method 원하는 HTTP 메소드
 * @param endpoint api endpoint ex) /getPopularSearches (/api 제외, / 로 시작)
 * @param baseOptions fetch options
 * @param baseOptions.isFetchFromRouteHandler true 일 경우, process.env.NEXT_PUBLIC_BASE_URL 로 fetch 합니다.
 * @param baseOptions.revalidateTags revalidateTag 를 사용하여 revalidate 할 태그들을 배열로 넣어줍니다.
 * @param requestSchema request body 를 검증할 스키마
 * @param responseSchema response data 를 검증할 스키마
 * @returns
 */
const request = ({
  method,
  endpoint,
  baseOptions,
  requestSchema,
  responseSchema,
}: {
  method: "POST" | "GET" | "PATCH" | "PUT" | "DELETE";
  endpoint: string;
  baseOptions?: TBaseOptions;
  requestSchema?: ZodSchema;
  responseSchema?: ZodSchema;
}) => {
  const combinedOptions: TBaseOptions = {
    isLoggedIn: true,
    ...baseOptions,
  };
  /**
   * @param body request body
   * @param options fetch options
   * @param options.params path parameter ex) "/:id => /1", / 는 제외
   * @param options.queryString query parameter array ex) ["page=1", "size=10"]
   */
  return async <T, D, isDataArray extends boolean | undefined = true>(
    body?: T,
    options: TFetchOptions = {},
  ): Promise<isDataArray extends true ? ResponseReturnType<D[]> : ResponseReturnType<D>> => {
    try {
      const requestBody = requestSchema && body ? ApiRequestBody(requestSchema, body, false) : body;

      const defaultHeaders = {
        "Content-Type": "application/json",
      };

      const requestHeaders = {
        ...defaultHeaders,
        ...options.headers,
      };

      const requestOptions = {
        method,
        headers: requestHeaders,
        credentials: options.credentials || "include",
        // tag 를 사용하여 캐시를 관리할 수 있습니다.
        next: {
          tags: [endpoint],
          ...combinedOptions.next,
        },
        // 요청과 무관한 fetch options 가 있으면 fetch 함수에서 요청시 무시합니다.
        ...combinedOptions,
      };

      const combinedQueryString = options.queryString ? `?${options.queryString.join("&")}` : "";

      const res = await fetch(
        `${
          combinedOptions.isFetchFromRouteHandler
            ? process.env.NEXT_PUBLIC_BASE_URL
            : process.env.NEXT_PUBLIC_API_BASE_URL
        }/api${endpoint}/${options.params ?? ""}${combinedQueryString}`,
        {
          ...requestOptions,
          body: requestBody ? JSON.stringify(requestBody) : null,
        },
      );

      if (!res.ok) {
        throw new Error(`Failed to fetch error ${res.status}, ${res.statusText}`);
      }

      const revalidateTags = combinedOptions?.revalidateTags;

      if (revalidateTags) {
        revalidateTags.forEach((tag) => {
          revalidateTag(tag);
        });
      }

      const data = await res.json();

      return responseSchema ? ApiResponse(responseSchema, data, combinedOptions.isDataArray) : data;
    } catch (e) {
      console.error(e);
      throw new Error("Failed to fetch");
    }
  };
};

export const publicFetchApi = {
  /**
   * POST
   * @param endpoint api endpoint ex) /getPopularSearches (/api 제외, / 로 시작)
   * @param baseOptions fetch options
   * @param baseOptions.isFetchFromRouteHandler true 일 경우, process.env.NEXT_PUBLIC_BASE_URL 로 fetch 합니다.
   * @param baseOptions.revalidateTags revalidateTag 를 사용하여 revalidate 할 태그들을 배열로 넣어줍니다.
   * @param requestSchema request body 를 검증할 스키마
   * @param responseSchema response data 를 검증할 스키마
   * @returns
   */
  post: (params: {
    endpoint: string;
    baseOptions?: TBaseOptions;
    requestSchema?: ZodSchema;
    responseSchema?: ZodSchema;
  }) => request({ method: "POST", ...params }),
  /**
   * GET
   * @param endpoint api endpoint ex) /getPopularSearches (/api 제외, / 로 시작)
   * @param baseOptions fetch options
   * @param baseOptions.isFetchFromRouteHandler true 일 경우, process.env.NEXT_PUBLIC_BASE_URL 로 fetch 합니다.
   * @param baseOptions.revalidateTags revalidateTag 를 사용하여 revalidate 할 태그들을 배열로 넣어줍니다.
   * @param requestSchema request body 를 검증할 스키마
   * @param responseSchema response data 를 검증할 스키마
   * @returns
   */
  get: (params: {
    endpoint: string;
    baseOptions?: TBaseOptions;
    requestSchema?: ZodSchema;
    responseSchema?: ZodSchema;
  }) => request({ method: "GET", ...params }),
  /**
   * PATCH
   * @param endpoint api endpoint ex) /getPopularSearches (/api 제외, / 로 시작)
   * @param baseOptions fetch options
   * @param baseOptions.isFetchFromRouteHandler true 일 경우, process.env.NEXT_PUBLIC_BASE_URL 로 fetch 합니다.
   * @param baseOptions.revalidateTags revalidateTag 를 사용하여 revalidate 할 태그들을 배열로 넣어줍니다.
   * @param requestSchema request body 를 검증할 스키마
   * @param responseSchema response data 를 검증할 스키마
   * @returns
   */
  patch: (params: {
    endpoint: string;
    baseOptions?: TBaseOptions;
    requestSchema?: ZodSchema;
    responseSchema?: ZodSchema;
  }) => request({ method: "PATCH", ...params }),
  /**
   * DELETE
   * @param endpoint api endpoint ex) /getPopularSearches (/api 제외, / 로 시작)
   * @param baseOptions fetch options
   * @param baseOptions.isFetchFromRouteHandler true 일 경우, process.env.NEXT_PUBLIC_BASE_URL 로 fetch 합니다.
   * @param baseOptions.revalidateTags revalidateTag 를 사용하여 revalidate 할 태그들을 배열로 넣어줍니다.
   * @param requestSchema request body 를 검증할 스키마
   * @param responseSchema response data 를 검증할 스키마
   * @returns
   */
  delete: (params: {
    endpoint: string;
    baseOptions?: TBaseOptions;
    requestSchema?: ZodSchema;
    responseSchema?: ZodSchema;
  }) => request({ method: "DELETE", ...params }),
};
