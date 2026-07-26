"use client";

import { useGetPaymentMethodsQuery } from "@/store/api/slices/payments-api";

export function usePaymentMethods() {
  const { data, isLoading, error } = useGetPaymentMethodsQuery(undefined);
  return { data, isLoading, error };
}
