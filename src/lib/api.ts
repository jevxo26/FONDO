import { cookies } from "next/headers";
import { ApiError } from "./api-error";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface ServerFetchOptions extends RequestInit {
  revalidate?: number;
  tags?: string[];
}

export async function apiFetch<T>(endpoint: string, options?: ServerFetchOptions): Promise<T> {
  const { revalidate = 60, tags, headers: optionHeaders, ...fetchOptions } = options ?? {};

  let authHeader: Record<string, string> = {};
  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refreshToken");
    if (refreshToken?.value) {
      authHeader = { Authorization: `Bearer ${refreshToken.value}` };
    }
  } catch {
    // called from client — no cookies() available
  }

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...fetchOptions,
    headers: {
      "Content-Type": "application/json",
      ...authHeader,
      ...(optionHeaders as Record<string, string> | undefined),
    },
    next: {
      revalidate,
      tags,
    },
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new ApiError(res.status, body.message || "Failed to fetch data");
  }

  const result: ApiResponse<T> = await res.json();

  return result.data;
}
