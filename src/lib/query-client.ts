import { QueryClient } from "@tanstack/react-query";
import { ApiError } from "./api-error";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30 * 1000,
      retry: 1,
      refetchOnWindowFocus: false,
      throwOnError: (error) => {
        if (error instanceof ApiError) return error.status >= 500;
        return false;
      },
    },
  },
});
