import axios from "axios";
import { ApiError } from "./api-error";
import { getToken, setToken, clearToken } from "./token";

const apiClient = axios.create({
  baseURL: "/api",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value: unknown) => void;
  reject: (reason: unknown) => void;
}> = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

apiClient.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url?.includes("/auth/refresh")
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return apiClient(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const response = await apiClient.post("/auth/refresh");
        const { token } = response.data.data;
        setToken(token);
        processQueue(null, token);
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        clearToken();
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

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
