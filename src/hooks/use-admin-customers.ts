"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import { queryKeys } from "@/lib/query-keys";
import { qs } from "@/lib/utils";
import type {
  AdminCustomer,
  AdminCustomerDetail,
  AdminCustomerOrder,
  AdminSubscription,
  AdminPayment,
  AdminWallet,
  AdminWalletTransaction,
  PaginatedResult,
  WalletResponse,
} from "@/types/admin";

export function useAdminCustomers(params?: {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
}) {
  return useQuery({
    queryKey: queryKeys.admin.customers.list(params),
    queryFn: () =>
      api.get<PaginatedResult<AdminCustomer>>(`/admin/customers${qs(params)}`),
  });
}

export function useAdminCustomer(id: string) {
  return useQuery({
    queryKey: queryKeys.admin.customers.detail(id),
    queryFn: () => api.get<AdminCustomerDetail>(`/admin/customers/${id}`),
    enabled: !!id,
  });
}

export function useAdminCustomerOrders(
  customerId: string,
  params?: { page?: number; limit?: number; status?: string },
) {
  return useQuery({
    queryKey: queryKeys.admin.customers.orders(customerId, params),
    queryFn: () =>
      api.get<PaginatedResult<AdminCustomerOrder>>(
        `/admin/customers/${customerId}/orders${qs(params)}`,
      ),
    enabled: !!customerId,
  });
}

export function useAdminCustomerSubscriptions(
  customerId: string,
  params?: { page?: number; limit?: number },
) {
  return useQuery({
    queryKey: queryKeys.admin.customers.subscriptions(customerId, params),
    queryFn: () =>
      api.get<PaginatedResult<AdminSubscription>>(
        `/admin/customers/${customerId}/subscriptions${qs(params)}`,
      ),
    enabled: !!customerId,
  });
}

export function useAdminCustomerWallet(
  customerId: string,
  params?: { page?: number; limit?: number },
) {
  return useQuery({
    queryKey: queryKeys.admin.customers.wallet(customerId, params),
    queryFn: () =>
      api.get<WalletResponse>(
        `/admin/customers/${customerId}/wallet${qs(params)}`,
      ),
    enabled: !!customerId,
  });
}

export function useAdminCustomerPayments(
  customerId: string,
  params?: { page?: number; limit?: number },
) {
  return useQuery({
    queryKey: queryKeys.admin.customers.payments(customerId, params),
    queryFn: () =>
      api.get<PaginatedResult<AdminPayment>>(
        `/admin/customers/${customerId}/payments${qs(params)}`,
      ),
    enabled: !!customerId,
  });
}
