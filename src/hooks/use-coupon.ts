"use client";

import { api } from "@/lib/api-client";
import { queryKeys } from "@/lib/query-keys";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useApplyCoupon() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (code: string) => api.post("/cart/checkout/apply-coupon", { couponCode: code }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.cart.all });
    },
  });
}

export function useSelectAddress() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (addressId: string) =>
      api.post("/cart/checkout/select-address", { addressId }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.cart.all });
    },
  });
}

export function useRemoveCoupon() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => api.delete("/cart/checkout/remove-coupon"),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.cart.all });
    },
  });
}
