"use client";

import { useApplyCouponMutation, useRemoveCouponMutation } from "@/store/api/slices/coupon-api";
import { useSelectAddressMutation } from "@/store/api/slices/addresses-api";
import { createMutationWrapper } from "@/store/api/mutation-wrapper";

export function useApplyCoupon() {
  const [trigger, { isLoading }] = useApplyCouponMutation();
  return { ...createMutationWrapper(trigger), isPending: isLoading };
}

export function useSelectAddress() {
  const [trigger, { isLoading }] = useSelectAddressMutation();
  return { ...createMutationWrapper(trigger), isPending: isLoading };
}

export function useRemoveCoupon() {
  const [trigger, { isLoading }] = useRemoveCouponMutation();
  return { ...createMutationWrapper(trigger), isPending: isLoading };
}
