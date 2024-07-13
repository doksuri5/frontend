import { ApiRequestBody, ApiResponse } from "@/types/ApiType";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { ZodSchema } from "zod";
import { revalidateTag } from "next/cache";
import { TStockTags } from "@/actions/stock";

type ResponseReturnType<D> = {
  data: D[];
  ok?: boolean;
  message?: string;
};

type TBaseOptions = RequestInit & {
  revalidateTags?: TStockTags[];
};
/**
 *
 * @param method 원하는 HTTP 메소드
 * @param endpoint api endpoint ex) /getPopularSearches (/api 제외, / 로 시작)
 * @param baseOptions fetch options
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
  /**
   * @param body request body
   * @param params query string ex) "/:id => /1", / 는 제외
   * @param queryString query string array ex) ["page=1", "size=10"]
   * @param options fetch options
   */
  return async <T, D>(
    body?: T,
    options: RequestInit & {
      params?: string;
      queryString?: string[];
    } = {},
  ): Promise<ResponseReturnType<D>> => {
    try {
      const requestBody = requestSchema && body ? ApiRequestBody(requestSchema, body, false) : body;

      const sid = cookies().get("connect.sid");

      if (!sid) {
        redirect("/login");
      }

      const defaultHeaders = {
        "Content-Type": "application/json",
        Cookie: `${sid.name}=${sid.value}`,
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
        },
        ...baseOptions,
      };

      const combinedQueryString = options.queryString ? `?${options.queryString.join("&")}` : "";
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api${endpoint}/${options.params ?? ""}${combinedQueryString}`,
        {
          ...requestOptions,
          body: requestBody ? JSON.stringify(requestBody) : null,
        },
      );

      if (!res.ok) {
        throw new Error(`Failed to fetch error ${res.status}, ${res.statusText}`);
      }

      const data = await res.json();

      return responseSchema ? ApiResponse(responseSchema, data) : data;
    } catch (e) {
      console.error(e);
      throw new Error("Failed to fetch");
    } finally {
      // revalidateTags 가 있을 경우 해당 태그들을 revalidate 합니다. 주로 다른 api 호출 후에 사용합니다.
      const revalidateTags = baseOptions?.revalidateTags;
      if (revalidateTags) {
        revalidateTags.forEach((tag) => {
          revalidateTag(tag);
        });
      }
    }
  };
};

export const api = {
  /**
   * POST
   * @param endpoint api endpoint ex) /getPopularSearches (/api 제외, / 로 시작)
   * @param baseOptions fetch options
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
