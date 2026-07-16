import apiClient from "./axios";
import { ApiError } from "./api-error";

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

async function request<T>(method: string, url: string, data?: unknown): Promise<T> {
  try {
    const response = await apiClient.request<ApiResponse<T>>({
      method,
      url,
      data,
    });
    return response.data.data;
  } catch (error: unknown) {
    const axiosError = error as {
      response?: { data?: { message?: string }; status?: number };
    };
    const status = axiosError.response?.status ?? 0;
    const message = axiosError.response?.data?.message || "Something went wrong";
    throw new ApiError(status, message);
  }
}

export const api = {
  get<T>(url: string): Promise<T> {
    return request<T>("GET", url);
  },
  post<T>(url: string, data?: unknown): Promise<T> {
    return request<T>("POST", url, data);
  },
  patch<T>(url: string, data?: unknown): Promise<T> {
    return request<T>("PATCH", url, data);
  },
  delete<T>(url: string): Promise<T> {
    return request<T>("DELETE", url);
  },
};
