import { api } from "../base-api";
import { createMutationWrapper } from "../mutation-wrapper";

export const couponApi = api.injectEndpoints({
  endpoints: (builder) => ({
    applyCoupon: builder.mutation<void, string>({
      query: (code) => ({
        url: "/cart/checkout/apply-coupon",
        method: "POST",
        body: { couponCode: code },
      }),
      invalidatesTags: ["Cart", "Coupon"],
    }),

    removeCoupon: builder.mutation<void, void>({
      query: () => ({ url: "/cart/checkout/remove-coupon", method: "DELETE" }),
      invalidatesTags: ["Cart"],
    }),
  }),
  overrideExisting: true,
});

export const { useApplyCouponMutation, useRemoveCouponMutation } = couponApi;

export function useApplyCoupon() {
  const [trigger, { isLoading }] = useApplyCouponMutation();
  return { ...createMutationWrapper(trigger), isPending: isLoading };
}

export function useRemoveCoupon() {
  const [trigger, { isLoading }] = useRemoveCouponMutation();
  return { ...createMutationWrapper(trigger), isPending: isLoading };
}
