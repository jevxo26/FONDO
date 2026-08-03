import { api } from "../base-api";
import { createMutationWrapper } from "../mutation-wrapper";
import type { Payment, InitiatePaymentPayload, InitiatePaymentResponse } from "@/types/payment";

export interface PaymentMethod {
  id: string;
  name: string;
  code: string;
  logo?: string;
  isDefault: boolean;
}

export interface PaymentListResponse {
  items: Payment[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export const paymentsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    initiatePayment: builder.mutation<InitiatePaymentResponse, InitiatePaymentPayload>({
      query: (body) => ({ url: "/payments/initiate", method: "POST", body }),
    }),

    getPayments: builder.query<PaymentListResponse, void>({
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

export const usePaymentMethods = () => {
  const { data, isLoading, error } = useGetPaymentMethodsQuery();
  return { data, isLoading, error };
};

export const usePayments = () => {
  const { data, isLoading, error } = useGetPaymentsQuery();
  return { data, isLoading, error };
};

export const usePayment = (id: string) => {
  const { data, isLoading, error } = useGetPaymentQuery(id, { skip: !id });
  return { data, isLoading, error };
};

export function useInitiatePayment() {
  const [trigger, { isLoading }] = useInitiatePaymentMutation();
  return { ...createMutationWrapper(trigger), isPending: isLoading };
}

export function useRetryPayment() {
  const [trigger, { isLoading }] = useRetryPaymentMutation();
  return { ...createMutationWrapper(trigger), isPending: isLoading };
}
