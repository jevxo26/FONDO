"use client";

import {
  useGetAdminCustomersQuery,
  useGetAdminCustomerQuery,
  useGetAdminCustomerOrdersQuery,
  useGetAdminCustomerSubscriptionsQuery,
  useGetAdminCustomerWalletQuery,
  useGetAdminCustomerPaymentsQuery,
} from "@/store/api/slices/admin-customers-api";

export function useAdminCustomers() {
  const { data, isLoading, error } = useGetAdminCustomersQuery(undefined);
  return { data, isLoading, error };
}

export function useAdminCustomer(id: string) {
  const { data, isLoading, error } = useGetAdminCustomerQuery(id, { skip: !id });
  return { data, isLoading, error };
}

export function useAdminCustomerOrders(customerId: string) {
  const { data, isLoading, error } = useGetAdminCustomerOrdersQuery(customerId, { skip: !customerId });
  return { data, isLoading, error };
}

export function useAdminCustomerSubscriptions(customerId: string) {
  const { data, isLoading, error } = useGetAdminCustomerSubscriptionsQuery(customerId, { skip: !customerId });
  return { data, isLoading, error };
}

export function useAdminCustomerWallet(customerId: string) {
  const { data, isLoading, error } = useGetAdminCustomerWalletQuery(customerId, { skip: !customerId });
  return { data, isLoading, error };
}

export function useAdminCustomerPayments(customerId: string) {
  const { data, isLoading, error } = useGetAdminCustomerPaymentsQuery(customerId, { skip: !customerId });
  return { data, isLoading, error };
}
