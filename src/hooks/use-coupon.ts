"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api-client";

export function useApplyCoupon() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (code: string) => api.post("/cart/checkout/apply-coupon", { code }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["cart"] });
    },
  });
}

export function useRemoveCoupon() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => api.delete("/cart/checkout/remove-coupon"),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["cart"] });
    },
  });
}

export function useSelectAddress() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (addressId: string) => api.post("/cart/checkout/select-address", { addressId }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["cart"] });
    },
  });
}
