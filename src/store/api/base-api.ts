import { createApi } from "@reduxjs/toolkit/query/react";
import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import { api as apiClient } from "@/lib/api-client";
import { ApiError } from "@/lib/api-error";
import { TAG_TYPES } from "./tags";

interface AxiosBaseQueryArgs {
  url: string;
  method?: string;
  body?: unknown;
  params?: Record<string, string | number | boolean>;
}

interface AxiosBaseQueryError {
  status: number;
  message: string;
}

type AxiosBaseQueryArg = string | AxiosBaseQueryArgs;

function normalizeArgs(args: AxiosBaseQueryArg): AxiosBaseQueryArgs {
  if (typeof args === "string") return { url: args, method: "GET" };
  return args;
}

const axiosBaseQuery: BaseQueryFn<AxiosBaseQueryArg, unknown, AxiosBaseQueryError> = async (args) => {
  try {
    const { url, method = "GET", body, params } = normalizeArgs(args);
    let queryUrl = url;
    if (params) {
      const searchParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        searchParams.append(key, String(value));
      });
      queryUrl += `?${searchParams.toString()}`;
    }
    const result = await apiClient.request<unknown>(method, queryUrl, body);
    return { data: result };
  } catch (error) {
    if (error instanceof ApiError) {
      return { error: { status: error.status, message: error.message } };
    }
    return { error: { status: 0, message: "An unexpected error occurred" } };
  }
};

export const api = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery,
  tagTypes: TAG_TYPES as unknown as string[],
  endpoints: () => ({}),
});
