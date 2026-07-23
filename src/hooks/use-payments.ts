"use client";

import { useQuery, useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import { queryKeys } from "@/lib/query-keys";
import type { Payment, InitiatePaymentPayload, InitiatePaymentResponse } from "@/types/payment";

export function useInitiatePayment() {
  return useMutation({
    mutationFn: (data: InitiatePaymentPayload) =>
      api.post<InitiatePaymentResponse>("/payments/initiate", data),
  });
}

export function usePayments() {
  return useQuery({
    queryKey: queryKeys.payments.all,
    queryFn: () => api.get<Payment[]>(`/payments`),
  });
}

export function usePayment(id: string) {
  return useQuery({
    queryKey: queryKeys.payments.detail(id),
    queryFn: () => api.get<Payment>(`/payments/${id}`),
    enabled: !!id,
  });
}

export function useRetryPayment() {
  return useMutation({
    mutationFn: (paymentId: string) =>
      api.post<InitiatePaymentResponse>(`/payments/${paymentId}/retry`),
  });
}
