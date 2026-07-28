import { api } from "../base-api";

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
  overrideExisting: false,
});

export const { useApplyCouponMutation, useRemoveCouponMutation } = couponApi;
