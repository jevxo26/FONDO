import { api } from "../base-api";
import type {
  VendorWallet,
  VendorWalletTransaction,
  VendorSettlement,
} from "@/types/wallet";

export const vendorSettlementApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getVendorWallet: builder.query<VendorWallet, string>({
      query: (vendorId) => `/vendor/${vendorId}/wallet`,
      providesTags: ["VendorSettlement"],
    }),

    getVendorWalletTransactions: builder.query<VendorWalletTransaction[], string>({
      query: (vendorId) => `/vendor/${vendorId}/wallet/transactions`,
      providesTags: ["VendorSettlement"],
    }),

    getVendorSettlements: builder.query<VendorSettlement[], string>({
      query: (vendorId) => `/vendor/${vendorId}/settlements`,
      providesTags: ["VendorSettlement"],
    }),

    getVendorSettlementDetail: builder.query<VendorSettlement, string>({
      query: (settlementId) => `/settlements/${settlementId}`,
      providesTags: (result, error, id) => [{ type: "VendorSettlement" as const, id }],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetVendorWalletQuery,
  useGetVendorWalletTransactionsQuery,
  useGetVendorSettlementsQuery,
  useGetVendorSettlementDetailQuery,
} = vendorSettlementApi;

export const useVendorWallet = (vendorId: string) => {
  const { data, isLoading, error } = useGetVendorWalletQuery(vendorId, {
    skip: !vendorId,
  });
  return { data, isLoading, error };
};

export const useVendorWalletTransactions = (vendorId: string) => {
  const { data, isLoading, error } = useGetVendorWalletTransactionsQuery(vendorId, {
    skip: !vendorId,
  });
  return { data: data ?? [], isLoading, error };
};

export const useVendorSettlements = (vendorId: string) => {
  const { data, isLoading, error } = useGetVendorSettlementsQuery(vendorId, {
    skip: !vendorId,
  });
  return { data: data ?? [], isLoading, error };
};
