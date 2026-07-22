"use client";

import { useQuery, useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import { queryKeys } from "@/lib/query-keys";
import type { Payment, PaymentListResponse, InitiatePaymentPayload, InitiatePaymentResponse } from "@/types/payment";

export function useInitiatePayment() {
  return useMutation({
    mutationFn: (data: InitiatePaymentPayload) =>
      api.post<InitiatePaymentResponse>("/payments/initiate", data),
  });
}

export function usePayments(page = 1, limit = 20) {
  return useQuery({
    queryKey: queryKeys.payments.list(page, limit),
    queryFn: () =>
      api.get<PaymentListResponse>(`/payments?page=${page}&limit=${limit}`),
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
