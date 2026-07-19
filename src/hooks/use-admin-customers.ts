"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api-client";

export interface AdminCustomer {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  status: string;
  totalOrders: number;
  totalSpent: number;
  subscriptionCount: number;
  walletBalance: number;
  lastOrderDate: string | null;
  joinedAt: string;
}

export interface AdminCustomerDetail {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  avatar: string | null;
  gender: string | null;
  dateOfBirth: string | null;
  status: string;
  isPhoneVerified: boolean;
  isEmailVerified: boolean;
  lastLoginAt: string | null;
  joinedAt: string;
  totalOrders: number;
  totalSubscriptions: number;
  totalPayments: number;
  totalSpent: number;
  lastOrder: {
    placedAt: string;
    orderStatus: string;
    totalAmount: number;
  } | null;
}

export interface AdminCustomerOrder {
  id: string;
  orderNumber: string;
  orderStatus: string;
  paymentStatus: string;
  totalAmount: number;
  placedAt: string;
  items: number;
  customerName?: string;
  customerId?: string;
}

export interface AdminSubscription {
  id: string;
  subscriptionNumber: string;
  customerId: string;
  packageId: string | null;
  startDate: string;
  endDate: string;
  duration: number;
  status: string;
  autoRenew: boolean;
  totalAmount: number;
  paidAmount: number;
  remainingAmount: number;
}

export interface AdminWalletTransaction {
  id: string;
  walletId: string;
  transactionType: string;
  amount: number;
  balanceBefore: number | null;
  balanceAfter: number | null;
  referenceType: string | null;
  referenceId: string | null;
  remarks: string | null;
  createdAt: string;
}

export interface AdminWallet {
  id: string;
  walletNumber: string;
  balance: number;
  holdBalance: number;
  currency: string;
  status: string;
}

export interface AdminPayment {
  id: string;
  paymentNumber: string;
  orderId: string;
  transactionId: string | null;
  amount: number;
  currency: string;
  status: string;
  paymentDate: string | null;
  failureReason: string | null;
  createdAt: string;
  order?: { orderNumber: string };
}

export interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface WalletResponse {
  wallet: AdminWallet | null;
  transactions: PaginatedResult<AdminWalletTransaction>;
}

function qs(params?: Record<string, string | number | undefined>): string {
  const sp = new URLSearchParams();
  for (const [k, v] of Object.entries(params ?? {})) {
    if (v !== undefined) sp.set(k, String(v));
  }
  const s = sp.toString();
  return s ? `?${s}` : "";
}

export function useAdminCustomers(params?: {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
}) {
  return useQuery({
    queryKey: ["admin", "customers", "list", params],
    queryFn: () =>
      api.get<PaginatedResult<AdminCustomer>>(`/admin/customers${qs(params)}`),
  });
}

export function useAdminCustomer(id: string) {
  return useQuery({
    queryKey: ["admin", "customers", id],
    queryFn: () => api.get<AdminCustomerDetail>(`/admin/customers/${id}`),
    enabled: !!id,
  });
}

export function useAdminCustomerOrders(
  customerId: string,
  params?: { page?: number; limit?: number; status?: string },
) {
  return useQuery({
    queryKey: ["admin", "customers", customerId, "orders", params],
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
    queryKey: ["admin", "customers", customerId, "subscriptions", params],
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
    queryKey: ["admin", "customers", customerId, "wallet", params],
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
    queryKey: ["admin", "customers", customerId, "payments", params],
    queryFn: () =>
      api.get<PaginatedResult<AdminPayment>>(
        `/admin/customers/${customerId}/payments${qs(params)}`,
      ),
    enabled: !!customerId,
  });
}
