"use client";

import {
  useGetOrdersQuery,
  useGetOrderQuery,
  useCancelOrderMutation,
  usePlaceOrderMutation,
} from "@/store/api/slices/orders-api";
import { createMutationWrapper } from "@/store/api/mutation-wrapper";

export function useOrders() {
  const { data, isLoading, error } = useGetOrdersQuery(undefined);
  return { data, isLoading, error };
}

export function useOrder(id: string) {
  const { data, isLoading, error } = useGetOrderQuery(id, { skip: !id });
  return { data, isLoading, error };
}

export function useCancelOrder() {
  const [trigger, { isLoading }] = useCancelOrderMutation();
  return { ...createMutationWrapper(trigger), isPending: isLoading };
}

export function usePlaceOrder() {
  const [trigger, { isLoading }] = usePlaceOrderMutation();
  return { ...createMutationWrapper(trigger), isPending: isLoading };
}
