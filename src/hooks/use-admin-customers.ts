"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import { queryKeys } from "@/lib/query-keys";
import type {
  AdminCustomer,
  AdminCustomerDetail,
  AdminCustomerOrder,
  AdminSubscription,
  AdminPayment,
  WalletResponse,
} from "@/types/admin";

export function useAdminCustomers() {
  return useQuery({
    queryKey: queryKeys.admin.customers.all,
    queryFn: () => api.get<AdminCustomer[]>(`/admin/customers`),
  });
}

export function useAdminCustomer(id: string) {
  return useQuery({
    queryKey: queryKeys.admin.customers.detail(id),
    queryFn: () => api.get<AdminCustomerDetail>(`/admin/customers/${id}`),
    enabled: !!id,
  });
}

export function useAdminCustomerOrders(customerId: string) {
  return useQuery({
    queryKey: queryKeys.admin.customers.orders(customerId),
    queryFn: () => api.get<AdminCustomerOrder[]>(`/admin/customers/${customerId}/orders`),
    enabled: !!customerId,
  });
}

export function useAdminCustomerSubscriptions(customerId: string) {
  return useQuery({
    queryKey: queryKeys.admin.customers.subscriptions(customerId),
    queryFn: () => api.get<AdminSubscription[]>(`/admin/customers/${customerId}/subscriptions`),
    enabled: !!customerId,
  });
}

export function useAdminCustomerWallet(customerId: string) {
  return useQuery({
    queryKey: queryKeys.admin.customers.wallet(customerId),
    queryFn: () => api.get<WalletResponse>(`/admin/customers/${customerId}/wallet`),
    enabled: !!customerId,
  });
}

export function useAdminCustomerPayments(customerId: string) {
  return useQuery({
    queryKey: queryKeys.admin.customers.payments(customerId),
    queryFn: () => api.get<AdminPayment[]>(`/admin/customers/${customerId}/payments`),
    enabled: !!customerId,
  });
}
