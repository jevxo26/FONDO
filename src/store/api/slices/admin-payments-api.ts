import { api } from "../base-api";
import { createMutationWrapper } from "../mutation-wrapper";
import type { Payment, PaymentDetail, RefundPayload, AdjustPayload } from "@/types/payment";
import type {
  VendorSettlement,
  CreateSettlementPayload,
  ProcessSettlementPayload,
  PlatformRevenue,
} from "@/types/wallet";

export const adminPaymentsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // Payments list (admin sees all)
    getAllPayments: builder.query<Payment[], void>({
      query: () => "/payments",
      providesTags: ["AdminPayment"],
    }),

    getPaymentDetail: builder.query<PaymentDetail, string>({
      query: (id) => `/payments/${id}`,
      providesTags: (result, error, id) => [{ type: "AdminPayment" as const, id }],
    }),

    refundPayment: builder.mutation<unknown, { paymentId: string } & RefundPayload>({
      query: ({ paymentId, ...body }) => ({
        url: `/payments/${paymentId}/refund`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["AdminPayment"],
    }),

    adjustPayment: builder.mutation<unknown, { paymentId: string } & AdjustPayload>({
      query: ({ paymentId, ...body }) => ({
        url: `/payments/${paymentId}/adjust`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["AdminPayment"],
    }),

    // Settlements (admin)
    getAllSettlements: builder.query<VendorSettlement[], void>({
      query: () => "/admin/settlements",
      providesTags: ["VendorSettlement"],
    }),

    createSettlement: builder.mutation<VendorSettlement, CreateSettlementPayload>({
      query: (body) => ({ url: "/admin/settlements", method: "POST", body }),
      invalidatesTags: ["VendorSettlement", "AdminPayment"],
    }),

    processSettlement: builder.mutation<unknown, ProcessSettlementPayload>({
      query: ({ settlementId, ...body }) => ({
        url: `/settlements/${settlementId}/process`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["VendorSettlement", "AdminPayment"],
    }),

    getSettlementDetail: builder.query<VendorSettlement, string>({
      query: (id) => `/settlements/${id}`,
      providesTags: (result, error, id) => [{ type: "VendorSettlement" as const, id }],
    }),

    // Platform revenue
    getPlatformRevenue: builder.query<PlatformRevenue, { from?: string; to?: string }>({
      query: ({ from, to }) => ({
        url: "/platform/revenue",
        params: { ...(from ? { from } : {}), ...(to ? { to } : {}) },
      }),
      providesTags: ["PlatformRevenue"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetAllPaymentsQuery,
  useGetPaymentDetailQuery,
  useRefundPaymentMutation,
  useAdjustPaymentMutation,
  useGetAllSettlementsQuery,
  useCreateSettlementMutation,
  useProcessSettlementMutation,
  useGetSettlementDetailQuery,
  useGetPlatformRevenueQuery,
} = adminPaymentsApi;

export const useAllPayments = () => {
  const { data, isLoading, error } = useGetAllPaymentsQuery();
  return { data: data ?? [], isLoading, error };
};

export const usePaymentDetail = (id: string) => {
  const { data, isLoading, error } = useGetPaymentDetailQuery(id, { skip: !id });
  return { data, isLoading, error };
};

export function useRefundPayment() {
  const [trigger, { isLoading }] = useRefundPaymentMutation();
  return { ...createMutationWrapper(trigger), isPending: isLoading };
}

export function useAdjustPayment() {
  const [trigger, { isLoading }] = useAdjustPaymentMutation();
  return { ...createMutationWrapper(trigger), isPending: isLoading };
}

export function useCreateSettlement() {
  const [trigger, { isLoading }] = useCreateSettlementMutation();
  return { ...createMutationWrapper(trigger), isPending: isLoading };
}

export function useProcessSettlement() {
  const [trigger, { isLoading }] = useProcessSettlementMutation();
  return { ...createMutationWrapper(trigger), isPending: isLoading };
}

export const usePlatformRevenue = (params: { from?: string; to?: string }) => {
  const { data, isLoading, error } = useGetPlatformRevenueQuery(params);
  return { data, isLoading, error };
};
