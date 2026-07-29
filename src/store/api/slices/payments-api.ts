import { api } from "../base-api";
import type { Payment, InitiatePaymentPayload, InitiatePaymentResponse } from "@/types/payment";

export interface PaymentMethod {
  id: string;
  name: string;
  code: string;
  logo?: string;
  isDefault: boolean;
}

export const paymentsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    initiatePayment: builder.mutation<InitiatePaymentResponse, InitiatePaymentPayload>({
      query: (body) => ({ url: "/payments/initiate", method: "POST", body }),
    }),

    getPayments: builder.query<Payment[], void>({
      query: () => "/payments",
      providesTags: ["Payment"],
    }),

    getPayment: builder.query<Payment, string>({
      query: (id) => `/payments/${id}`,
      providesTags: (result, error, id) => [{ type: "Payment" as const, id }],
    }),

    retryPayment: builder.mutation<InitiatePaymentResponse, string>({
      query: (paymentId) => ({ url: `/payments/${paymentId}/retry`, method: "POST" }),
    }),

    getPaymentMethods: builder.query<PaymentMethod[], void>({
      query: () => "/payment-methods",
      providesTags: ["PaymentMethod"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useInitiatePaymentMutation,
  useGetPaymentsQuery,
  useGetPaymentQuery,
  useRetryPaymentMutation,
  useGetPaymentMethodsQuery,
} = paymentsApi;
