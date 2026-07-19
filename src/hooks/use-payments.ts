"use client";

import { useQuery, useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api-client";

export interface InitiatePaymentPayload {
  orderId: string;
  amount: number;
  paymentMethodId?: string;
  currency?: string;
}

export interface InitiatePaymentResponse {
  paymentId: string;
  gatewayUrl: string;
  transactionId: string;
}

export interface Payment {
  id: string;
  paymentNumber: string;
  orderId: string;
  amount: number;
  currency: string;
  status: string;
  transactionId: string | null;
  paymentDate: string | null;
  failureReason: string | null;
  createdAt: string;
}

export interface PaymentListResponse {
  items: Payment[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export function useInitiatePayment() {
  return useMutation({
    mutationFn: (data: InitiatePaymentPayload) =>
      api.post<InitiatePaymentResponse>("/payments/initiate", data),
  });
}

export function usePayments(page = 1, limit = 20) {
  return useQuery({
    queryKey: ["payments", page, limit],
    queryFn: () =>
      api.get<PaymentListResponse>(`/payments?page=${page}&limit=${limit}`),
  });
}

export function usePayment(id: string) {
  return useQuery({
    queryKey: ["payments", id],
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
