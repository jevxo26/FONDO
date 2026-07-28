"use client";

import {
  useInitiatePaymentMutation,
  useGetPaymentsQuery,
  useGetPaymentQuery,
  useRetryPaymentMutation,
} from "@/store/api/slices/payments-api";
import { createMutationWrapper } from "@/store/api/mutation-wrapper";

export function useInitiatePayment() {
  const [trigger, { isLoading }] = useInitiatePaymentMutation();
  return { ...createMutationWrapper(trigger), isPending: isLoading };
}

export function usePayments() {
  const { data, isLoading, error } = useGetPaymentsQuery(undefined);
  return { data, isLoading, error };
}

export function usePayment(id: string) {
  const { data, isLoading, error } = useGetPaymentQuery(id, { skip: !id });
  return { data, isLoading, error };
}

export function useRetryPayment() {
  const [trigger, { isLoading }] = useRetryPaymentMutation();
  return { ...createMutationWrapper(trigger), isPending: isLoading };
}
