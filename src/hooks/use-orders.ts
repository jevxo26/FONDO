"use client";

import {
  useGetOrdersQuery,
  useGetOrderQuery,
  useCancelOrderMutation,
  usePlaceOrderMutation,
  useSubmitFeedbackMutation,
  useGetInvoiceQuery,
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

export function useSubmitFeedback() {
  const [trigger, { isLoading }] = useSubmitFeedbackMutation();
  return { ...createMutationWrapper(trigger), isPending: isLoading };
}

export function useInvoice(orderId: string) {
  const { data, isLoading, error } = useGetInvoiceQuery(orderId, { skip: !orderId });
  return { data, isLoading, error };
}
